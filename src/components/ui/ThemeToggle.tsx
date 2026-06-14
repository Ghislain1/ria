import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  dark: boolean
  onToggle: () => void
}

export function ThemeToggle({ dark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? 'Activate light mode' : 'Activate dark mode'}
      className="relative p-2 rounded-full bg-(--color-bg-alt) border border-(--color-border) text-(--color-text-muted) hover:text-(--color-primary) transition-colors duration-300 cursor-pointer"
    >
      <Sun
        className={`h-5 w-5 transition-all duration-300 ${dark
            ? 'opacity-0 scale-0 rotate-90 absolute'
            : 'opacity-100 scale-100 rotate-0'
          }`}
      />
      <Moon
        className={`h-5 w-5 transition-all duration-300 ${dark
            ? 'opacity-100 scale-100 rotate-0'
            : 'opacity-0 scale-0 -rotate-90 absolute'
          }`}
      />
    </button>
  )
}

