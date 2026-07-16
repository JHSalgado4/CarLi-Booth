const STORAGE_KEY = 'carli-booth-strips'

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function write(strips) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(strips))
}

export function getStrips() {
  return read().sort((a, b) => b.createdAt - a.createdAt)
}

export function saveStrip({ image, shots, meta = {} }) {
  const strips = read()
  const entry = {
    id: `strip_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    image,
    shots,
    meta,
    createdAt: Date.now(),
  }
  strips.push(entry)
  write(strips)
  return entry
}

export function deleteStrip(id) {
  const strips = read().filter((s) => s.id !== id)
  write(strips)
}
