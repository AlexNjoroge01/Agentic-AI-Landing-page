/**
 * Generates brand favicons without external dependencies:
 *   public/favicon.ico      (16/24/32/48 px, PNG-in-ICO)
 *   public/icon-192.png
 *   public/icon-512.png
 *
 * The glyph: rounded graphite tile with a cobalt "agent cell" — an arc on
 * the left half, a braced panel on the right, and a square nucleus.
 * Rendered procedurally via signed distance fields with 4x supersampling.
 *
 * Run: node scripts/generate-favicon.mjs
 */
import { deflateSync } from "node:zlib"
import { writeFileSync, mkdirSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(here, "../public")

const BG = [0x20 / 255, 0x1c / 255, 0x2b / 255, 0.94]
const STROKE = [0x8e / 255, 0xa4 / 255, 0xe8 / 255, 1]

// --- SDF helpers (32x32 design space) ------------------------------------
const clamp01 = (x) => Math.min(1, Math.max(0, x))

function sdRoundRect(px, py, cx, cy, hw, hh, r) {
  const qx = Math.abs(px - cx) - (hw - r)
  const qy = Math.abs(py - cy) - (hh - r)
  const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0))
  const inside = Math.min(Math.max(qx, qy), 0)
  return outside + inside - r
}

function sdCircle(px, py, cx, cy, r) {
  return Math.hypot(px - cx, py - cy) - r
}

const STROKE_W = 0.85 // half-width

/** Donut-stroke variant of a shape SDF: inside when |sd| <= w. */
const inStroke = (sd, w = STROKE_W) => Math.abs(sd) <= w

/** Braced panel on the right of the tile; its left edge is intentionally open. */
function braceOpen(x, y) {
  const sd = sdRoundRect(x, y, 19.65, 16, 3.65, 6.5, 1.7)
  if (!inStroke(sd)) return false
  if (x >= 16 + STROKE_W) return true // right, top and bottom edges
  // A left-edge line would run at x ≈ 16 — cut it away except near corners
  return Math.abs(y - 16) > 4.4
}

function glyph(x, y) {
  if (sdRoundRect(x, y, 16, 16, 16, 16, 7) <= 0) {
    const onArc = inStroke(sdCircle(x, y, 16, 16, 8.5)) && x <= 16
    const onBrace = braceOpen(x, y)
    const onCell = inStroke(sdRoundRect(x, y, 17, 16, 2.8, 2.8, 0.3))
    if (onArc || onBrace || onCell) return STROKE
    return BG
  }
  return [0, 0, 0, 0]
}

/** Render `size` px square with SS× supersampling; returns RGBA8 buffer. */
function render(size, SS = 4) {
  const buf = Buffer.alloc(size * size * 4)
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      let r = 0, g = 0, b = 0, a = 0
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const x = (px + (sx + 0.5) / SS) * (32 / size)
          const y = (py + (sy + 0.5) / SS) * (32 / size)
          const c = glyph(x, y)
          r += c[0]; g += c[1]; b += c[2]; a += c[3]
        }
      }
      const n = SS * SS
      const i = (py * size + px) * 4
      if (a > 0) {
        // premultiplied accumulation → straight alpha
        const ar = a / n
        buf[i] = Math.round(((r / n) / ar) * 255)
        buf[i + 1] = Math.round(((g / n) / ar) * 255)
        buf[i + 2] = Math.round(((b / n) / ar) * 255)
        buf[i + 3] = Math.round(clamp01(ar) * 255)
      }
    }
  }
  return buf
}

// --- PNG encoding ---------------------------------------------------------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()

function crc32(buf) {
  let c = 0xffffffff
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, "ascii"), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}

function encodePng(rgba, size) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type RGBA
  // rows: filter 0 + RGBA
  const raw = Buffer.alloc(size * (size * 4 + 1))
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0
    rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4)
  }
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ])
}

// --- ICO assembly ---------------------------------------------------------
function encodeIco(sizes) {
  const pngs = sizes.map((s) => encodePng(render(s), s))
  const count = sizes.length
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2) // icon
  header.writeUInt16LE(count, 4)
  const dir = Buffer.alloc(16 * count)
  let offset = 6 + 16 * count
  pngs.forEach((png, i) => {
    const e = i * 16
    dir[e] = sizes[i] === 256 ? 0 : sizes[i]
    dir[e + 1] = sizes[i] === 256 ? 0 : sizes[i]
    dir[e + 2] = 0 // colors
    dir[e + 3] = 0 // reserved
    dir.writeUInt16LE(1, e + 4) // planes
    dir.writeUInt16LE(32, e + 6) // bits per pixel
    dir.writeUInt32LE(png.length, e + 8)
    dir.writeUInt32LE(offset, e + 12)
    offset += png.length
  })
  return Buffer.concat([header, dir, ...pngs])
}

mkdirSync(publicDir, { recursive: true })
writeFileSync(join(publicDir, "favicon.ico"), encodeIco([16, 24, 32, 48]))
writeFileSync(join(publicDir, "icon-192.png"), encodePng(render(192), 192))
writeFileSync(join(publicDir, "icon-512.png"), encodePng(render(512), 512))
console.log("favicons written to", publicDir)
