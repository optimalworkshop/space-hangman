import type { Stats } from '../types/game'

interface Props {
  stats: Stats
}

export function StatsDisplay({ stats }: Props) {
  return (
    <div className="flex gap-4 justify-center text-sm text-slate-400">
      <span>Wins: <span className="text-correct font-bold">{stats.wins}</span></span>
      <span>Losses: <span className="text-wrong font-bold">{stats.losses}</span></span>
      <span>Streak: <span className="text-nebula-purple font-bold">{stats.currentStreak}</span></span>
      <span>Best: <span className="text-star-white font-bold">{stats.maxStreak}</span></span>
    </div>
  )
}
