import type { GameStatus } from '../types/game'

export const MAX_WRONG_GUESSES = 6

export function selectRandomWord(words: string[]): string {
  return words[Math.floor(Math.random() * words.length)]
}

export function evaluateGuess(
  word: string,
  letter: string,
  guessedLetters: Set<string>,
): { isCorrect: boolean; alreadyGuessed: boolean } {
  const upperLetter = letter.toUpperCase()
  if (guessedLetters.has(upperLetter)) {
    return { isCorrect: false, alreadyGuessed: true }
  }
  return { isCorrect: word.includes(upperLetter), alreadyGuessed: false }
}

export function getWrongGuesses(word: string, guessedLetters: Set<string>): string[] {
  return [...guessedLetters].filter((l) => !word.includes(l))
}

export function getCorrectGuesses(word: string, guessedLetters: Set<string>): string[] {
  return [...guessedLetters].filter((l) => word.includes(l))
}

export function checkGameStatus(
  word: string,
  guessedLetters: Set<string>,
  maxWrong: number = MAX_WRONG_GUESSES,
): GameStatus {
  const wrongCount = getWrongGuesses(word, guessedLetters).length
  if (wrongCount >= maxWrong) return 'lost'
  const allLettersGuessed = [...word].every((l) => guessedLetters.has(l))
  if (allLettersGuessed) return 'won'
  return 'playing'
}

export function getMaskedWord(word: string, guessedLetters: Set<string>): string[] {
  return [...word].map((l) => (guessedLetters.has(l) ? l : '_'))
}
