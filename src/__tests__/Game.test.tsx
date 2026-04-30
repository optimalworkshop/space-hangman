import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Game } from '../components/Game'

vi.mock('../logic/words', () => ({
  SPACE_WORDS: ['NEBULA'],
}))

describe('Game', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the game title', () => {
    render(<Game />)
    expect(screen.getByText('Space Hangman')).toBeInTheDocument()
  })

  it('shows word display with blanks', () => {
    render(<Game />)
    expect(screen.getByLabelText('Word to guess')).toBeInTheDocument()
  })

  it('shows keyboard', () => {
    render(<Game />)
    expect(screen.getByRole('group', { name: 'Letter keyboard' })).toBeInTheDocument()
  })

  it('reveals letter on correct guess click', async () => {
    render(<Game />)
    await userEvent.click(screen.getByRole('button', { name: 'N' }))
    const wordDisplay = screen.getByLabelText('Word to guess')
    expect(wordDisplay).toHaveTextContent('N')
  })

  it('reveals letter on correct keyboard press', async () => {
    render(<Game />)
    await userEvent.keyboard('e')
    const wordDisplay = screen.getByLabelText('Word to guess')
    expect(wordDisplay).toHaveTextContent('E')
  })

  it('adds drawing part on wrong guess', async () => {
    const { container } = render(<Game />)
    await userEvent.keyboard('x')
    expect(container.querySelector('[data-testid="part-helmet"]')).toBeInTheDocument()
  })

  it('shows win message when all letters guessed', async () => {
    render(<Game />)
    await userEvent.keyboard('nebula')
    expect(screen.getByText('Mission Complete!')).toBeInTheDocument()
  })

  it('shows loss message after 6 wrong guesses', async () => {
    render(<Game />)
    await userEvent.keyboard('xyzwqj')
    expect(screen.getByText('Mission Failed')).toBeInTheDocument()
  })

  it('reveals word on loss', async () => {
    render(<Game />)
    await userEvent.keyboard('xyzwqj')
    expect(screen.getByText('NEBULA')).toBeInTheDocument()
  })

  it('resets game on Play Again click', async () => {
    render(<Game />)
    await userEvent.keyboard('nebula')
    await userEvent.click(screen.getByText('Play Again'))
    expect(screen.queryByText('Mission Complete!')).not.toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Letter keyboard' })).toBeInTheDocument()
  })

  it('shows guesses remaining', () => {
    render(<Game />)
    expect(screen.getByText('6 guesses remaining')).toBeInTheDocument()
  })

  it('decrements guesses remaining on wrong guess', async () => {
    render(<Game />)
    await userEvent.keyboard('x')
    expect(screen.getByText('5 guesses remaining')).toBeInTheDocument()
  })

  it('shows stats', () => {
    render(<Game />)
    expect(screen.getByText(/Wins:/)).toBeInTheDocument()
    expect(screen.getByText(/Losses:/)).toBeInTheDocument()
    expect(screen.getByText(/Streak:/)).toBeInTheDocument()
  })
})
