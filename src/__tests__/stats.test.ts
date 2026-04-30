import { describe, it, expect, beforeEach } from 'vitest'
import { loadStats, saveStats, updateStatsOnWin, updateStatsOnLoss } from '../logic/stats'
import type { Stats } from '../types/game'

describe('stats', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('loadStats', () => {
    it('returns default stats when nothing is stored', () => {
      expect(loadStats()).toEqual({
        wins: 0,
        losses: 0,
        currentStreak: 0,
        maxStreak: 0,
      })
    })

    it('returns stored stats', () => {
      const stats: Stats = { wins: 5, losses: 2, currentStreak: 3, maxStreak: 4 }
      localStorage.setItem('space-hangman-stats', JSON.stringify(stats))
      expect(loadStats()).toEqual(stats)
    })

    it('returns defaults when stored data is invalid JSON', () => {
      localStorage.setItem('space-hangman-stats', 'not-json')
      expect(loadStats()).toEqual({
        wins: 0,
        losses: 0,
        currentStreak: 0,
        maxStreak: 0,
      })
    })
  })

  describe('saveStats', () => {
    it('persists stats to localStorage', () => {
      const stats: Stats = { wins: 3, losses: 1, currentStreak: 2, maxStreak: 3 }
      saveStats(stats)
      expect(JSON.parse(localStorage.getItem('space-hangman-stats')!)).toEqual(stats)
    })
  })

  describe('updateStatsOnWin', () => {
    it('increments wins and streak', () => {
      const stats: Stats = { wins: 2, losses: 1, currentStreak: 2, maxStreak: 3 }
      const updated = updateStatsOnWin(stats)
      expect(updated.wins).toBe(3)
      expect(updated.currentStreak).toBe(3)
    })

    it('updates maxStreak when current exceeds it', () => {
      const stats: Stats = { wins: 2, losses: 0, currentStreak: 3, maxStreak: 3 }
      const updated = updateStatsOnWin(stats)
      expect(updated.maxStreak).toBe(4)
    })

    it('does not change maxStreak when current is below it', () => {
      const stats: Stats = { wins: 5, losses: 3, currentStreak: 1, maxStreak: 5 }
      const updated = updateStatsOnWin(stats)
      expect(updated.maxStreak).toBe(5)
    })
  })

  describe('updateStatsOnLoss', () => {
    it('increments losses and resets streak', () => {
      const stats: Stats = { wins: 5, losses: 2, currentStreak: 3, maxStreak: 5 }
      const updated = updateStatsOnLoss(stats)
      expect(updated.losses).toBe(3)
      expect(updated.currentStreak).toBe(0)
    })

    it('preserves maxStreak', () => {
      const stats: Stats = { wins: 5, losses: 2, currentStreak: 3, maxStreak: 5 }
      const updated = updateStatsOnLoss(stats)
      expect(updated.maxStreak).toBe(5)
    })
  })
})
