import topRightFlowerUrl from '../assets/Top-RightFlower.png'
import bottomLeftFlowerUrl from '../assets/Bottom-LeftFlower.png'

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

async function ensureFonts() {
  try {
    await Promise.all([
      document.fonts.load('64px "Mrs Saint Delafield"'),
      document.fonts.load('28px "Cormorant Garamond"'),
      document.fonts.load('600 16px "Jost"'),
    ])
  } catch {
    /* fonts may already be loaded or unavailable — canvas will fall back */
  }
}

const NAVY = '#2f3b52'
const NAVY_SOFT = '#5a6478'
const IVORY = '#f5f3ec'
const LINE = 'rgba(47, 59, 82, 0.55)'

export async function composeStrip(images, { names = 'Liza and Carmelo', date = '18th July 2026', handle = '@yourphotostudio' } = {}) {
  await ensureFonts()

  const cellW = 720
  const cellH = 540
  const gap = 22
  const pad = 40
  const footerH = 230

  const width = cellW + pad * 2
  const height = pad + images.length * cellH + (images.length - 1) * gap + footerH

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  // background
  ctx.fillStyle = IVORY
  ctx.fillRect(0, 0, width, height)

  // outer + inner border
  ctx.strokeStyle = LINE
  ctx.lineWidth = 2
  ctx.strokeRect(14, 14, width - 28, height - 28)

  // photos
  const loaded = await Promise.all(images.map(loadImage))
  loaded.forEach((img, i) => {
    const x = pad
    const y = pad + i * (cellH + gap)
    ctx.save()
    ctx.beginPath()
    ctx.rect(x, y, cellW, cellH)
    ctx.clip()
    const scale = Math.max(cellW / img.width, cellH / img.height)
    const dw = img.width * scale
    const dh = img.height * scale
    ctx.drawImage(img, x + (cellW - dw) / 2, y + (cellH - dh) / 2, dw, dh)
    ctx.restore()
    ctx.strokeStyle = LINE
    ctx.lineWidth = 1.5
    ctx.strokeRect(x, y, cellW, cellH)
  })

  // footer content
  const footerTop = pad + images.length * cellH + (images.length - 1) * gap
  const centerX = width / 2

  ctx.textAlign = 'center'
  ctx.fillStyle = NAVY
  ctx.font = '68px "Mrs Saint Delafield", cursive'
  ctx.fillText(names, centerX, footerTop + 78)

  ctx.font = '500 22px "Cormorant Garamond", serif'
  ctx.fillStyle = NAVY_SOFT
  ctx.textTransform = 'uppercase'
  ctx.fillText(date.toUpperCase(), centerX, footerTop + 118)

  // monogram with rule lines
  const initials = names
    .split(/and|&/i)
    .map((s) => s.trim()[0])
    .filter(Boolean)
    .join(' | ')
  ctx.font = '600 22px "Jost", sans-serif'
  ctx.fillStyle = NAVY
  ctx.fillText(initials.toUpperCase(), centerX, footerTop + 158)

  // handle bottom-left, thank you bottom-right
  ctx.textAlign = 'left'
  ctx.font = '400 18px "Jost", sans-serif'
  ctx.fillStyle = NAVY_SOFT
  ctx.fillText(handle, pad + 4, footerTop + footerH - 30)

  ctx.textAlign = 'right'
  ctx.fillText('Thank you for celebrating with us!', width - pad - 4, footerTop + footerH - 30)

  // floral corners
  try {
    const topRightFlower = await loadImage(topRightFlowerUrl)
    const bottomLeftFlower = await loadImage(bottomLeftFlowerUrl)
    const fw = 130
    const fh = 190
    ctx.save()
    ctx.globalAlpha = 0.5
    ctx.drawImage(topRightFlower, width - 14 - fw, 14, fw, fh)
    ctx.drawImage(bottomLeftFlower, 14, height - 14 - fh, fw, fh)
    ctx.restore()
  } catch {
    /* floral decoration is optional */
  }

  return canvas.toDataURL('image/jpeg', 0.95)
}
