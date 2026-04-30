import { useGame } from '../hooks/useGame'
import { useKeyboardListener } from '../hooks/useKeyboardListener'
import { getWrongGuesses, MAX_WRONG_GUESSES } from '../logic/gameLogic'
import { HangmanDrawing } from './HangmanDrawing'
import { WordDisplay } from './WordDisplay'
import { Keyboard } from './Keyboard'
import { GameResult } from './GameResult'
import { StatsDisplay } from './StatsDisplay'

export function Game() {
  const { gameState, stats, guessLetter, startNewGame } = useGame()
  const { word, guessedLetters, status } = gameState

  useKeyboardListener(guessLetter, status)

  const wrongGuessCount = getWrongGuesses(word, guessedLetters).length

  return (
    <div className="w-full max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-star-white mb-2 tracking-wide">
        Space Hangman
      </h1>
      <StatsDisplay stats={stats} />

      <div className="mt-6">
        <HangmanDrawing wrongGuessCount={wrongGuessCount} />
        <WordDisplay word={word} guessedLetters={guessedLetters} revealed={status === 'lost'} />

        {status === 'playing' ? (
          <Keyboard
            word={word}
            guessedLetters={guessedLetters}
            onGuess={guessLetter}
            disabled={false}
          />
        ) : (
          <GameResult status={status} word={word} onPlayAgain={startNewGame} />
        )}

        {status === 'playing' && (
          <p className="text-center text-slate-500 text-sm mt-4">
            {MAX_WRONG_GUESSES - wrongGuessCount} guesses remaining
          </p>
        )}
      </div>
    </div>
  )
}
