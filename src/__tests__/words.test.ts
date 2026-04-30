import { describe, it, expect } from 'vitest'
import { SPACE_WORDS } from '../logic/words'

describe('SPACE_WORDS', () => {
  it('has between 50 and 100 words', () => {
    expect(SPACE_WORDS.length).toBeGreaterThanOrEqual(50)
    expect(SPACE_WORDS.length).toBeLessThanOrEqual(100)
  })

  it('contains only uppercase alphabetic characters', () => {
    for (const word of SPACE_WORDS) {
      expect(word).toMatch(/^[A-Z]+$/)
    }
  })

  it('has no duplicates', () => {
    const unique = new Set(SPACE_WORDS)
    expect(unique.size).toBe(SPACE_WORDS.length)
  })

  it('has words of at least 3 characters', () => {
    for (const word of SPACE_WORDS) {
      expect(word.length).toBeGreaterThanOrEqual(3)
    }
  })
})
