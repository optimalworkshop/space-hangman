import { useEffect } from 'react'
import type { GameStatus } from '../types/game'

export function useKeyboardListener(
  onGuess: (letter: string) => void,
  status: GameStatus,
) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (status !== 'playing') return
      const key = e.key.toUpperCase()
      if (/^[A-Z]$/.test(key)) {
        onGuess(key)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onGuess, status])
}
