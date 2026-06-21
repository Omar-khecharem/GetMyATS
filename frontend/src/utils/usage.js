const STORAGE_KEY = 'ats_usage_count'
const PROMO_KEY = 'ats_promo_bonus'
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

export const getLimit = () => {
  try {
    const bonus = Number(localStorage.getItem(PROMO_KEY)) || 0
    return FREE_LIMIT + bonus
  } catch {
    return FREE_LIMIT
  }
}

export const applyPromo = (bonus) => {
  try {
    localStorage.setItem(PROMO_KEY, String(bonus))
  } catch {}
}

export const hasPromo = () => {
  try {
    return Number(localStorage.getItem(PROMO_KEY)) > 0
  } catch {
    return false
  }
}

export const isBlocked = () => getUsageCount() >= getLimit()

export const getRemaining = () => Math.max(0, getLimit() - getUsageCount())
