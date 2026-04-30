# AI Agent Guidelines

## Workflow

When working on a new feature or fix:

1. **Start from main** — pull the latest changes from `origin/main`
2. **Create a feature branch** — use a descriptive name (e.g., `add-difficulty-selector`, `fix-streak-reset`)
3. **Implement the change** — write code, add or update tests, ensure type-checking passes
4. **Run verification** before committing:
   - `npm test` — all tests must pass
   - `npx tsc -b` — no type errors
5. **Commit with clear messages** — explain the "why", not the "what"
6. **Push the branch and open a PR** — include a summary, what changed, and how to test it
7. **Wait for CI** — both `test` and `typecheck` status checks must pass before merge

## Branch protection

Direct pushes to `main` are blocked. All changes must go through a pull request with passing CI checks.

## Project conventions

- Game logic lives in `src/logic/` as pure functions (no side effects)
- State management uses `useReducer` in custom hooks (`src/hooks/`)
- Components are in `src/components/` — keep them focused on rendering
- Tests go in `src/__tests__/` — cover both logic (unit) and components (integration)
- Use the `MAX_WRONG_GUESSES` constant from `gameLogic.ts` rather than hardcoding numbers
- Tailwind CSS for styling — use the custom theme colors defined in `src/index.css`

## Running the app

```bash
npm install
npm run dev       # dev server at localhost:5173
npm test          # run all tests
npx tsc -b        # type-check
```
