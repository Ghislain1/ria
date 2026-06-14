import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' && [
          'bg-(--color-primary) text-white',
          'hover:bg-(--color-primary-dark)',
          'shadow-lg shadow-(--color-primary)/25',
          'hover:shadow-xl hover:shadow-(--color-primary)/30',
          'hover:-translate-y-0.5',
        ],
        variant === 'secondary' && [
          'bg-(--color-secondary) text-white',
          'hover:bg-(--color-secondary)/90',
          'shadow-lg shadow-(--color-secondary)/25',
          'hover:-translate-y-0.5',
        ],
        variant === 'outline' && [
          'border-2 border-(--color-primary) text-(--color-primary)',
          'hover:bg-(--color-primary) hover:text-white',
        ],
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3 text-base',
        size === 'lg' && 'px-8 py-4 text-lg',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

