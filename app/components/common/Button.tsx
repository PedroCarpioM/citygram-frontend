import { Loader2 } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'gradient' | 'purple' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-pink-500 text-white hover:brightness-90',
  gradient: 'bg-gradient-brand text-white hover:brightness-90',
  purple: 'bg-purple-500 text-white hover:brightness-90',
  outline: 'bg-white text-ink-900 border-2 border-ink-200 hover:brightness-95',
  ghost: 'bg-transparent text-pink-500 hover:brightness-90',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2.5 text-body-sm',
  md: 'px-5.5 py-3.5 text-button',
  lg: 'px-6.5 py-4 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold transition duration-fast active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {isLoading && <Loader2 aria-hidden size={16} className="animate-spin" />}
      {children}
    </button>
  )
}
