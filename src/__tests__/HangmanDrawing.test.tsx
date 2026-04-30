import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HangmanDrawing } from '../components/HangmanDrawing'

describe('HangmanDrawing', () => {
  it('shows no parts when wrongGuessCount is 0', () => {
    const { container } = render(<HangmanDrawing wrongGuessCount={0} />)
    expect(container.querySelector('[data-testid="part-helmet"]')).not.toBeInTheDocument()
    expect(container.querySelector('[data-testid="part-body"]')).not.toBeInTheDocument()
    expect(container.querySelector('[data-testid="part-left-arm"]')).not.toBeInTheDocument()
    expect(container.querySelector('[data-testid="part-right-arm"]')).not.toBeInTheDocument()
    expect(container.querySelector('[data-testid="part-left-leg"]')).not.toBeInTheDocument()
    expect(container.querySelector('[data-testid="part-right-leg"]')).not.toBeInTheDocument()
  })

  it('shows helmet when wrongGuessCount is 1', () => {
    const { container } = render(<HangmanDrawing wrongGuessCount={1} />)
    expect(container.querySelector('[data-testid="part-helmet"]')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="part-body"]')).not.toBeInTheDocument()
  })

  it('shows 3 parts when wrongGuessCount is 3', () => {
    const { container } = render(<HangmanDrawing wrongGuessCount={3} />)
    expect(container.querySelector('[data-testid="part-helmet"]')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="part-body"]')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="part-left-arm"]')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="part-right-arm"]')).not.toBeInTheDocument()
  })

  it('shows all 8 parts when wrongGuessCount is 8', () => {
    const { container } = render(<HangmanDrawing wrongGuessCount={8} />)
    expect(container.querySelector('[data-testid="part-helmet"]')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="part-body"]')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="part-left-arm"]')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="part-right-arm"]')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="part-left-leg"]')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="part-right-leg"]')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="part-oxygen-tank"]')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="part-tether"]')).toBeInTheDocument()
  })

  it('has accessible label', () => {
    render(<HangmanDrawing wrongGuessCount={3} />)
    expect(screen.getByLabelText('3 of 8 wrong guesses')).toBeInTheDocument()
  })
})
