import type { Stats } from '../types/game'

const STORAGE_KEY = 'space-hangman-stats'

const DEFAULT_STATS: Stats = {
  wins: 0,
  losses: 0,
  currentStreak: 0,
  maxStreak: 0,
}

export function loadStats(): Stats {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return { ...DEFAULT_STATS }
  try {
    return JSON.parse(raw) as Stats
  } catch {
    return { ...DEFAULT_STATS }
  }
}

export function saveStats(stats: Stats): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
}

export function updateStatsOnWin(stats: Stats): Stats {
  const currentStreak = stats.currentStreak + 1
  return {
    ...stats,
    wins: stats.wins + 1,
    currentStreak,
    maxStreak: Math.max(stats.maxStreak, currentStreak),
  }
}

export function updateStatsOnLoss(stats: Stats): Stats {
  return {
    ...stats,
    losses: stats.losses + 1,
    currentStreak: 0,
  }
}
