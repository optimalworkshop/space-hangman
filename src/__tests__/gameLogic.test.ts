import { describe, it, expect } from 'vitest'
import {
  selectRandomWord,
  evaluateGuess,
  getWrongGuesses,
  getCorrectGuesses,
  checkGameStatus,
  getMaskedWord,
  MAX_WRONG_GUESSES,
} from '../logic/gameLogic'

describe('selectRandomWord', () => {
  it('returns a word from the given list', () => {
    const words = ['ASTEROID', 'NEBULA', 'QUASAR']
    const result = selectRandomWord(words)
    expect(words).toContain(result)
  })
})

describe('evaluateGuess', () => {
  it('returns correct when letter is in the word', () => {
    const result = evaluateGuess('NEBULA', 'N', new Set())
    expect(result).toEqual({ isCorrect: true, alreadyGuessed: false })
  })

  it('returns incorrect when letter is not in the word', () => {
    const result = evaluateGuess('NEBULA', 'X', new Set())
    expect(result).toEqual({ isCorrect: false, alreadyGuessed: false })
  })

  it('returns alreadyGuessed when letter was already guessed', () => {
    const result = evaluateGuess('NEBULA', 'N', new Set(['N']))
    expect(result).toEqual({ isCorrect: false, alreadyGuessed: true })
  })

  it('is case-insensitive', () => {
    const result = evaluateGuess('NEBULA', 'n', new Set())
    expect(result).toEqual({ isCorrect: true, alreadyGuessed: false })
  })
})

describe('getWrongGuesses', () => {
  it('returns only letters not in the word', () => {
    const guessed = new Set(['N', 'X', 'E', 'Z'])
    expect(getWrongGuesses('NEBULA', guessed)).toEqual(['X', 'Z'])
  })

  it('returns empty array when all guesses are correct', () => {
    const guessed = new Set(['N', 'E', 'B'])
    expect(getWrongGuesses('NEBULA', guessed)).toEqual([])
  })
})

describe('getCorrectGuesses', () => {
  it('returns only letters in the word', () => {
    const guessed = new Set(['N', 'X', 'E', 'Z'])
    expect(getCorrectGuesses('NEBULA', guessed)).toEqual(['N', 'E'])
  })
})

describe('checkGameStatus', () => {
  it('returns playing when game is in progress', () => {
    const guessed = new Set(['N', 'E'])
    expect(checkGameStatus('NEBULA', guessed)).toBe('playing')
  })

  it('returns won when all letters are guessed', () => {
    const guessed = new Set(['N', 'E', 'B', 'U', 'L', 'A'])
    expect(checkGameStatus('NEBULA', guessed)).toBe('won')
  })

  it('returns lost when max wrong guesses reached', () => {
    const guessed = new Set(['X', 'Y', 'Z', 'W', 'Q', 'J', 'K', 'M'])
    expect(checkGameStatus('NEBULA', guessed)).toBe('lost')
  })

  it('uses MAX_WRONG_GUESSES constant which is 8', () => {
    expect(MAX_WRONG_GUESSES).toBe(8)
  })

  it('returns won even with some wrong guesses', () => {
    const guessed = new Set(['N', 'E', 'B', 'U', 'L', 'A', 'X', 'Y'])
    expect(checkGameStatus('NEBULA', guessed)).toBe('won')
  })
})

describe('getMaskedWord', () => {
  it('returns all underscores when no letters guessed', () => {
    expect(getMaskedWord('NEBULA', new Set())).toEqual(['_', '_', '_', '_', '_', '_'])
  })

  it('reveals guessed letters', () => {
    expect(getMaskedWord('NEBULA', new Set(['N', 'A']))).toEqual(['N', '_', '_', '_', '_', 'A'])
  })

  it('reveals all letters when word is fully guessed', () => {
    const guessed = new Set(['N', 'E', 'B', 'U', 'L', 'A'])
    expect(getMaskedWord('NEBULA', guessed)).toEqual(['N', 'E', 'B', 'U', 'L', 'A'])
  })
})
