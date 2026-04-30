import { getMaskedWord } from '../logic/gameLogic'

interface Props {
  word: string
  guessedLetters: Set<string>
  revealed: boolean
}

export function WordDisplay({ word, guessedLetters, revealed }: Props) {
  const display = revealed ? [...word] : getMaskedWord(word, guessedLetters)

  return (
    <div className="flex gap-2 justify-center my-6" aria-label="Word to guess">
      {display.map((char, i) => (
        <span
          key={i}
          className={`w-8 h-10 flex items-center justify-center text-2xl font-bold border-b-2 ${
            char === '_'
              ? 'border-slate-500 text-transparent'
              : revealed && !guessedLetters.has(char)
                ? 'border-nebula-purple text-nebula-purple'
                : 'border-star-white text-star-white'
          }`}
        >
          {char === '_' ? ' ' : char}
        </span>
      ))}
    </div>
  )
}
