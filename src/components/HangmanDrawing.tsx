interface Props {
  wrongGuessCount: number
}

export function HangmanDrawing({ wrongGuessCount }: Props) {
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto" aria-label={`${wrongGuessCount} of 6 wrong guesses`}>
      {/* Helmet */}
      {wrongGuessCount >= 1 && (
        <g data-testid="part-helmet">
          <circle cx="100" cy="50" r="25" fill="none" stroke="white" strokeWidth="2" />
          <path d="M 85 45 Q 100 40 115 45 Q 115 55 100 55 Q 85 55 85 45" fill="#60a5fa" opacity="0.6" />
        </g>
      )}
      {/* Body/Suit */}
      {wrongGuessCount >= 2 && (
        <g data-testid="part-body">
          <rect x="85" y="75" width="30" height="45" rx="5" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="100" cy="85" r="3" fill="#60a5fa" />
        </g>
      )}
      {/* Left Arm */}
      {wrongGuessCount >= 3 && (
        <g data-testid="part-left-arm">
          <line x1="85" y1="85" x2="60" y2="105" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="57" cy="107" r="4" fill="none" stroke="white" strokeWidth="1.5" />
        </g>
      )}
      {/* Right Arm */}
      {wrongGuessCount >= 4 && (
        <g data-testid="part-right-arm">
          <line x1="115" y1="85" x2="140" y2="105" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="143" cy="107" r="4" fill="none" stroke="white" strokeWidth="1.5" />
        </g>
      )}
      {/* Left Leg */}
      {wrongGuessCount >= 5 && (
        <g data-testid="part-left-leg">
          <line x1="90" y1="120" x2="75" y2="155" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <rect x="70" y="153" width="10" height="6" rx="2" fill="white" />
        </g>
      )}
      {/* Right Leg */}
      {wrongGuessCount >= 6 && (
        <g data-testid="part-right-leg">
          <line x1="110" y1="120" x2="125" y2="155" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <rect x="120" y="153" width="10" height="6" rx="2" fill="white" />
        </g>
      )}
      {/* Floating particles when lost */}
      {wrongGuessCount >= 6 && (
        <g opacity="0.5">
          <circle cx="50" cy="30" r="1.5" fill="white" />
          <circle cx="150" cy="40" r="1" fill="white" />
          <circle cx="40" cy="140" r="1" fill="white" />
          <circle cx="160" cy="130" r="1.5" fill="white" />
        </g>
      )}
    </svg>
  )
}
