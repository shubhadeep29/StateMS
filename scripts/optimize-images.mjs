// Generates responsive WebP variants from assets-src/ into public/assets/.
// Run with: npm run images
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const SRC = 'assets-src'
const OUT = 'public/assets'
const QUALITY = 78

// name -> { file, widths, crop? }
const jobs = {
  pharmacy_hero: { file: 'pharmacy_hero.png', widths: [640, 1024] },
  dr_kabir_banner: { file: 'dr_kabir_banner.jpeg', widths: [800, 1600] },
  shop_counter: { file: 'shop_counter.png', widths: [640, 1024] },
  shop_shelves: { file: 'shop_shelves.png', widths: [640, 1024] },
  waiting_area: { file: 'waiting_area.png', widths: [640, 1024] },
  consultation_room: { file: 'consultation_room.png', widths: [640, 1024] },
  // Cross symbol only, without the small wordmark text underneath
  'logo-mark': { file: 'pharmacy_logo.png', widths: [64, 128], crop: { left: 200, top: 105, width: 620, height: 620 } },
}

await mkdir(OUT, { recursive: true })

for (const [name, { file, widths, crop }] of Object.entries(jobs)) {
  const meta = await sharp(`${SRC}/${file}`).metadata()
  const srcWidth = crop ? crop.width : meta.width
  for (const w of widths) {
    let img = sharp(`${SRC}/${file}`)
    if (crop) img = img.extract(crop)
    const info = await img
      .resize({ width: Math.min(w, srcWidth), withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(`${OUT}/${name}-${w}.webp`)
    console.log(`${name}-${w}.webp ${info.width}x${info.height} ${Math.round(info.size / 1024)} KB`)
  }
}

// Favicon: 64px PNG of the logo mark
const fav = await sharp(`${SRC}/pharmacy_logo.png`).extract(jobs['logo-mark'].crop).resize(64).png().toFile('public/favicon.png')
console.log(`favicon.png ${Math.round(fav.size / 1024)} KB`)
