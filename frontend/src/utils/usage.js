const STORAGE_KEY = 'ats_usage_count'
const FREE_LIMIT = 3

export const getUsageCount = () => {
  try {
    return Number(localStorage.getItem(STORAGE_KEY)) || 0
  } catch {
    return 0
  }
}

export const incrementUsage = () => {
  try {
    const count = getUsageCount() + 1
    localStorage.setItem(STORAGE_KEY, String(count))
    return count
  } catch {
    return 0
  }
}

export const resetUsage = () => {
  try {
    localStorage.setItem(STORAGE_KEY, '0')
  } catch {}
}

export const isBlocked = () => getUsageCount() >= FREE_LIMIT

export const getRemaining = () => Math.max(0, FREE_LIMIT - getUsageCount())
