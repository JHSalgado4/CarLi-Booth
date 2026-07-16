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

const FRAME_TONES = {
  ivory: {
    background: '#f5f3ec',
    line: 'rgba(47, 59, 82, 0.55)',
  },

  blush: {
    background: '#f4ede9',
    line: 'rgba(129, 91, 92, 0.40)',
  },

  sage: {
    background: '#eef1ea',
    line: 'rgba(72, 95, 80, 0.42)',
  },

  ink: {
    background: '#eef2f8',
    line: 'rgba(46, 58, 74, 0.44)',
  },

  champagne: {
    background: '#f6efe4',
    line: 'rgba(151, 120, 74, 0.42)',
  },

  linen: {
    background: '#f8f4ef',
    line: 'rgba(125, 116, 103, 0.40)',
  },

  pearl: {
    background: '#faf8f5',
    line: 'rgba(94, 102, 125, 0.30)',
  },

  mocha: {
    background: '#efe8df',
    line: 'rgba(109, 90, 74, 0.42)',
  },

  dustyRose: {
    background: '#f5e9eb',
    line: 'rgba(137, 96, 105, 0.40)',
  },

  eucalyptus: {
    background: '#edf3ef',
    line: 'rgba(82, 108, 94, 0.42)',
  },

  lavenderMist: {
    background: '#f3f0f7',
    line: 'rgba(108, 103, 130, 0.40)',
  },

  skyMist: {
    background: '#edf4f8',
    line: 'rgba(87, 109, 132, 0.40)',
  },

  sand: {
    background: '#f2ebdf',
    line: 'rgba(133, 112, 78, 0.42)',
  },

  stone: {
    background: '#f1f0ec',
    line: 'rgba(103, 108, 111, 0.40)',
  },
}

const FILTERS = {
  soft: 'contrast(1.04) saturate(0.96) brightness(1.04)',
  warm: 'sepia(0.18) saturate(1.08) contrast(1.02)',
  mono: 'grayscale(1) contrast(1.08)',
  clean: 'contrast(1.02) saturate(1.02) brightness(1.08)',
}

const TEMPLATE_FORMATS = {
  1: { width: 900, photoWidth: 720, photoHeight: 760, columns: 1, footerHeight: 410 },
  2: { width: 900, photoWidth: 720, photoHeight: 560, columns: 1, footerHeight: 410 },
  3: { width: 1800, photoWidth: 720, photoHeight: 520, columns: 2, footerHeight: 390 },
  4: { width: 1800, photoWidth: 1500, photoHeight: 1780, columns: 1, footerHeight: 490 },
  6: { width: 2700, photoWidth: 760, photoHeight: 940, columns: 3, footerHeight: 410 },
}

function seededNoise(index) {
  const value = Math.sin(index * 9283.51) * 43758.5453
  return value - Math.floor(value)
}

function drawPaper(ctx, width, height) {
  ctx.fillStyle = '#f7f7f1'
  ctx.fillRect(0, 0, width, height)

  for (let index = 0; index < 18; index += 1) {
    const x = seededNoise(index) * width
    const y = seededNoise(index + 31) * height
    const radius = 130 + seededNoise(index + 62) * 300
    const wash = ctx.createRadialGradient(x, y, 0, x, y, radius)
    wash.addColorStop(0, 'rgba(152, 164, 157, 0.09)')
    wash.addColorStop(0.55, 'rgba(183, 173, 161, 0.035)')
    wash.addColorStop(1, 'rgba(247, 247, 241, 0)')
    ctx.fillStyle = wash
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawPhoto(ctx, image, x, y, width, height, filter, line) {
  ctx.fillStyle = '#edf0ed'
  ctx.fillRect(x, y, width, height)
  ctx.save()
  ctx.beginPath()
  ctx.rect(x, y, width, height)
  ctx.clip()
  ctx.filter = filter
  // Cover behavior: fill the entire frame while preserving aspect ratio.
  // This may crop evenly (left/right or top/bottom) instead of leaving blank space.
  const scale = Math.max(width / image.width, height / image.height)
  const drawWidth = image.width * scale
  const drawHeight = image.height * scale

  const offsetX = (width - drawWidth) / 2
  const offsetY = (height - drawHeight) / 2

  ctx.drawImage(image, x + offsetX, y + offsetY, drawWidth, drawHeight)

  ctx.restore()

  ctx.strokeStyle = line
  ctx.lineWidth = 2
  ctx.strokeRect(x, y, width, height)
}

function formatDate(date, format) {
  const parsed = new Date(date.replace(/(\d+)(st|nd|rd|th)/i, '$1'))
  if (Number.isNaN(parsed.getTime())) return date.toUpperCase()

  if (format === 'numeric') {
    return `${String(parsed.getMonth() + 1).padStart(2, '0')}.${String(parsed.getDate()).padStart(2, '0')}.${parsed.getFullYear()}`
  }

  if (format === 'short') {
    return new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).format(parsed).toUpperCase()
  }

  return date.toUpperCase()
}

function drawHeart(ctx, x, y, size) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(size, size)
  ctx.beginPath()
  ctx.moveTo(0, 0.3)
  ctx.bezierCurveTo(-1.2, -0.45, -1, -1.25, -0.35, -1.25)
  ctx.bezierCurveTo(0, -1.25, 0, -0.72, 0, -0.4)
  ctx.bezierCurveTo(0, -0.72, 0, -1.25, 0.35, -1.25)
  ctx.bezierCurveTo(1, -1.25, 1.2, -0.45, 0, 0.3)
  ctx.closePath()
  ctx.fillStyle = '#c88a91'
  ctx.fill()
  ctx.strokeStyle = NAVY
  ctx.lineWidth = 0.09
  ctx.stroke()
  ctx.restore()
}

function drawSparkle(ctx, x, y, size) {
  ctx.save()
  ctx.strokeStyle = '#b4986c'
  ctx.lineWidth = Math.max(2, size * 0.12)
  ctx.beginPath()
  ctx.moveTo(x - size, y)
  ctx.lineTo(x + size, y)
  ctx.moveTo(x, y - size)
  ctx.lineTo(x, y + size)
  ctx.stroke()
  ctx.restore()
}

function drawWeddingIcon(ctx, icon, centerX, footerTop) {
  if (icon === 'rings') {
    ctx.save()
    ctx.strokeStyle = '#b4986c'
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.arc(centerX - 22, footerTop + 257, 26, 0, Math.PI * 2)
    ctx.arc(centerX + 22, footerTop + 257, 26, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }

  if (icon === 'bells') {
    ctx.save()
    ctx.strokeStyle = '#b4986c'
    ctx.fillStyle = 'rgba(180, 152, 108, 0.16)'
    ctx.lineWidth = 4
    for (const offset of [-28, 28]) {
      ctx.beginPath()
      ctx.arc(centerX + offset, footerTop + 243, 24, Math.PI, 0)
      ctx.lineTo(centerX + offset + 24, footerTop + 268)
      ctx.lineTo(centerX + offset - 24, footerTop + 268)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(centerX + offset, footerTop + 274, 4, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  }
}

export async function composeStrip(
  images,
  {
    names = 'Liza and Carmelo',
    date = '18th July 2026',
    handle = '@yourphotostudio',
    frameTone = 'ivory',
    photoFilter = 'soft',
    template = 1,
    sticker = 'none',
    weddingIcon = 'none',
    floralAccent = 'corners',
    dateFormat = 'long',
    overlayText = '',
    overlayPosition = 'photos',
  } = {},
) {
  await ensureFonts()

  const format = TEMPLATE_FORMATS[template] || TEMPLATE_FORMATS[1]
  const gap = 34
  const pad = 90
  const rows = Math.ceil(images.length / format.columns)
  const photoBlockHeight = rows * format.photoHeight + Math.max(0, rows - 1) * gap
  const width = format.width
  const footerH = format.footerHeight
  const height = pad + photoBlockHeight + footerH + 72

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  const tone = FRAME_TONES[frameTone] || FRAME_TONES.ivory
  const filter = FILTERS[photoFilter] || photoFilter || FILTERS.soft

  drawPaper(ctx, width, height)
  ctx.globalAlpha = 0.62
  ctx.fillStyle = tone.background
  ctx.fillRect(0, 0, width, height)
  ctx.globalAlpha = 1

  ctx.strokeStyle = tone.line
  ctx.lineWidth = 3
  ctx.strokeRect(38, 38, width - 76, height - 76)

  const loaded = await Promise.all(images.map(loadImage))
  loaded.forEach((img, i) => {
    const column = i % format.columns
    const row = Math.floor(i / format.columns)
    const usedWidth = format.columns * format.photoWidth + (format.columns - 1) * gap
    const x = (width - usedWidth) / 2 + column * (format.photoWidth + gap)
    const y = pad + row * (format.photoHeight + gap)
    drawPhoto(ctx, img, x, y, format.photoWidth, format.photoHeight, filter, tone.line)
  })

  if (overlayText && overlayPosition === 'photos') {
    ctx.save()
    ctx.textAlign = 'center'
    ctx.font = `${Math.min(44, width / 35)}px "Cormorant Garamond", serif`
    ctx.fillStyle = '#ffffff'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.52)'
    ctx.shadowBlur = 10
    ctx.fillText(overlayText, width / 2, pad + 64)
    ctx.restore()
  }

  const footerTop = pad + photoBlockHeight
  const centerX = width / 2

  ctx.textAlign = 'center'
  ctx.fillStyle = NAVY
  ctx.font = `${Math.min(78, width / 18)}px "Mrs Saint Delafield", cursive`
  ctx.fillText(names, centerX, footerTop + 116)

  ctx.font = '600 24px "Jost", sans-serif'
  ctx.fillStyle = NAVY_SOFT
  ctx.fillText(formatDate(date, dateFormat), centerX, footerTop + 164)

  // monogram with rule lines
  const initials = names
    .split(/and|&/i)
    .map((s) => s.trim()[0])
    .filter(Boolean)
    .join(' | ')
  ctx.font = '500 27px "Cormorant Garamond", serif'
  ctx.fillStyle = NAVY
  ctx.fillText(initials.toUpperCase(), centerX, footerTop + 220)

  ctx.lineWidth = 2
  ctx.strokeStyle = tone.line
  ctx.beginPath()
  ctx.moveTo(centerX - 260, footerTop + 218)
  ctx.lineTo(centerX - 90, footerTop + 218)
  ctx.moveTo(centerX + 90, footerTop + 218)
  ctx.lineTo(centerX + 260, footerTop + 218)
  ctx.stroke()

  if (overlayText && overlayPosition === 'footer') {
    ctx.font = 'italic 26px "Cormorant Garamond", serif'
    ctx.fillStyle = NAVY_SOFT
    ctx.fillText(overlayText, centerX, footerTop + 270)
  }

  if (sticker === 'hearts') {
    drawHeart(ctx, 110, footerTop + 118, 19)
    drawHeart(ctx, width - 108, footerTop + 118, 14)
  }

  if (sticker === 'sparkles') {
    drawSparkle(ctx, 114, footerTop + 120, 22)
    drawSparkle(ctx, width - 112, footerTop + 124, 16)
  }

  drawWeddingIcon(ctx, weddingIcon, centerX, footerTop)

  ctx.textAlign = 'left'
  ctx.font = '400 19px "Jost", sans-serif'
  ctx.fillStyle = NAVY_SOFT
  ctx.fillText(handle, 86, height - 78)

  ctx.textAlign = 'right'
  ctx.fillText('Thank you for celebrating with us!', width - 86, height - 78)

  try {
    const topRightFlower = await loadImage(topRightFlowerUrl)
    const bottomLeftFlower = await loadImage(bottomLeftFlowerUrl)
    const fw = Math.min(330, width * 0.22)
    const fh = fw * 1.45
    ctx.save()
    ctx.globalAlpha = 0.82
    if (floralAccent === 'corners' || floralAccent === 'top') {
      ctx.drawImage(topRightFlower, width - 66 - fw, 56, fw, fh)
    }
    if (floralAccent === 'corners' || floralAccent === 'bottom') {
      ctx.drawImage(bottomLeftFlower, 48, height - 58 - fh, fw, fh)
    }
    ctx.restore()
  } catch {
    /* floral decoration is optional */
  }

  return canvas.toDataURL('image/jpeg', 0.95)
}
