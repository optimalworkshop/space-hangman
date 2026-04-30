import { getCorrectGuesses, getWrongGuesses } from '../logic/gameLogic'

interface Props {
  word: string
  guessedLetters: Set<string>
  onGuess: (letter: string) => void
  disabled: boolean
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export function Keyboard({ word, guessedLetters, onGuess, disabled }: Props) {
  const correctSet = new Set(getCorrectGuesses(word, guessedLetters))
  const wrongSet = new Set(getWrongGuesses(word, guessedLetters))

  return (
    <div className="grid grid-cols-9 gap-1.5 max-w-md mx-auto" role="group" aria-label="Letter keyboard">
      {LETTERS.map((letter) => {
        const isCorrect = correctSet.has(letter)
        const isWrong = wrongSet.has(letter)
        const isUsed = isCorrect || isWrong

        let colorClass = 'bg-space-700 hover:bg-space-800 text-star-white'
        if (isCorrect) colorClass = 'bg-correct text-white'
        if (isWrong) colorClass = 'bg-wrong text-white opacity-50'

        return (
          <button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={disabled || isUsed}
            aria-label={letter}
            className={`w-9 h-10 rounded font-semibold text-sm transition-colors ${colorClass} disabled:cursor-not-allowed`}
          >
            {letter}
          </button>
        )
      })}
    </div>
  )
}
