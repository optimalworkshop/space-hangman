import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WordDisplay } from '../components/WordDisplay'

describe('WordDisplay', () => {
  it('shows correct number of character slots', () => {
    render(<WordDisplay word="NEBULA" guessedLetters={new Set()} revealed={false} />)
    const container = screen.getByLabelText('Word to guess')
    expect(container.children).toHaveLength(6)
  })

  it('hides unguessed letters', () => {
    render(<WordDisplay word="NEBULA" guessedLetters={new Set()} revealed={false} />)
    expect(screen.queryByText('N')).not.toBeInTheDocument()
  })

  it('reveals correctly guessed letters', () => {
    render(<WordDisplay word="NEBULA" guessedLetters={new Set(['N', 'A'])} revealed={false} />)
    expect(screen.getByText('N')).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('reveals full word when revealed prop is true', () => {
    render(<WordDisplay word="NEBULA" guessedLetters={new Set()} revealed={true} />)
    expect(screen.getByText('N')).toBeInTheDocument()
    expect(screen.getByText('E')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('U')).toBeInTheDocument()
    expect(screen.getByText('L')).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
  })
})
