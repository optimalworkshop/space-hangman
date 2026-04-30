export type GameStatus = 'playing' | 'won' | 'lost'

export interface GameState {
  word: string
  guessedLetters: Set<string>
  status: GameStatus
}

export interface Stats {
  wins: number
  losses: number
  currentStreak: number
  maxStreak: number
}
