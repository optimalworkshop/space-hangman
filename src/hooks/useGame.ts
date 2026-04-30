import { useReducer, useEffect, useCallback, useState } from 'react'
import type { GameState, GameStatus, Stats } from '../types/game'
import { selectRandomWord, checkGameStatus } from '../logic/gameLogic'
import { loadStats, saveStats, updateStatsOnWin, updateStatsOnLoss } from '../logic/stats'
import { SPACE_WORDS } from '../logic/words'

type Action = { type: 'GUESS_LETTER'; letter: string } | { type: 'NEW_GAME' }

function createInitialState(): GameState {
  return {
    word: selectRandomWord(SPACE_WORDS),
    guessedLetters: new Set(),
    status: 'playing',
  }
}

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'GUESS_LETTER': {
      if (state.status !== 'playing') return state
      const letter = action.letter.toUpperCase()
      if (state.guessedLetters.has(letter)) return state
      const guessedLetters = new Set(state.guessedLetters)
      guessedLetters.add(letter)
      const status = checkGameStatus(state.word, guessedLetters)
      return { ...state, guessedLetters, status }
    }
    case 'NEW_GAME':
      return createInitialState()
    default:
      return state
  }
}

export function useGame() {
  const [gameState, dispatch] = useReducer(gameReducer, null, createInitialState)
  const [stats, setStats] = useState<Stats>(loadStats)
  const [prevStatus, setPrevStatus] = useState<GameStatus>('playing')

  useEffect(() => {
    if (gameState.status === prevStatus) return
    setPrevStatus(gameState.status)
    if (gameState.status === 'won') {
      const updated = updateStatsOnWin(stats)
      setStats(updated)
      saveStats(updated)
    } else if (gameState.status === 'lost') {
      const updated = updateStatsOnLoss(stats)
      setStats(updated)
      saveStats(updated)
    }
  }, [gameState.status, prevStatus, stats])

  const guessLetter = useCallback((letter: string) => {
    dispatch({ type: 'GUESS_LETTER', letter })
  }, [])

  const startNewGame = useCallback(() => {
    dispatch({ type: 'NEW_GAME' })
    setPrevStatus('playing')
  }, [])

  return { gameState, stats, guessLetter, startNewGame }
}
