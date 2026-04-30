import type { GameStatus } from '../types/game'

interface Props {
  status: GameStatus
  word: string
  onPlayAgain: () => void
}

export function GameResult({ status, word, onPlayAgain }: Props) {
  if (status === 'playing') return null

  const isWin = status === 'won'

  return (
    <div className="text-center my-4">
      <p className={`text-xl font-bold ${isWin ? 'text-correct' : 'text-wrong'}`}>
        {isWin ? 'Mission Complete!' : 'Mission Failed'}
      </p>
      {!isWin && (
        <p className="text-star-white mt-1">
          The word was: <span className="font-bold text-nebula-purple">{word}</span>
        </p>
      )}
      <button
        onClick={onPlayAgain}
        className="mt-4 px-6 py-2 bg-nebula-purple text-white rounded-lg font-semibold hover:bg-nebula-blue transition-colors"
      >
        Play Again
      </button>
    </div>
  )
}
