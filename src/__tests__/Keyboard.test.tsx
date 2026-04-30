import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Keyboard } from '../components/Keyboard'

describe('Keyboard', () => {
  const defaultProps = {
    word: 'NEBULA',
    guessedLetters: new Set<string>(),
    onGuess: vi.fn(),
    disabled: false,
  }

  it('renders 26 letter buttons', () => {
    render(<Keyboard {...defaultProps} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(26)
  })

  it('calls onGuess when a letter is clicked', async () => {
    const onGuess = vi.fn()
    render(<Keyboard {...defaultProps} onGuess={onGuess} />)
    await userEvent.click(screen.getByRole('button', { name: 'N' }))
    expect(onGuess).toHaveBeenCalledWith('N')
  })

  it('disables correctly guessed letters', () => {
    render(<Keyboard {...defaultProps} guessedLetters={new Set(['N', 'E'])} />)
    expect(screen.getByRole('button', { name: 'N' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'E' })).toBeDisabled()
  })

  it('disables wrong guessed letters', () => {
    render(<Keyboard {...defaultProps} guessedLetters={new Set(['X'])} />)
    expect(screen.getByRole('button', { name: 'X' })).toBeDisabled()
  })

  it('leaves unguessed letters enabled', () => {
    render(<Keyboard {...defaultProps} guessedLetters={new Set(['N'])} />)
    expect(screen.getByRole('button', { name: 'Z' })).not.toBeDisabled()
  })

  it('applies correct color class to correct guesses', () => {
    render(<Keyboard {...defaultProps} guessedLetters={new Set(['N'])} />)
    expect(screen.getByRole('button', { name: 'N' })).toHaveClass('bg-correct')
  })

  it('applies wrong color class to incorrect guesses', () => {
    render(<Keyboard {...defaultProps} guessedLetters={new Set(['X'])} />)
    expect(screen.getByRole('button', { name: 'X' })).toHaveClass('bg-wrong')
  })

  it('disables all buttons when disabled prop is true', () => {
    render(<Keyboard {...defaultProps} disabled={true} />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => expect(button).toBeDisabled())
  })
})
