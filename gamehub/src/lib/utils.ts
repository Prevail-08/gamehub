import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amountInCents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amountInCents / 100)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(date))
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date()
  const then = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return formatDate(date)
}

export function getGameColor(gameType: string): string {
  const colors: Record<string, string> = {
    PUBG_MOBILE: 'bg-orange-500',
    COD_MOBILE: 'bg-green-500',
    FREE_FIRE: 'bg-yellow-500',
    FC_26: 'bg-blue-600',
    VALORANT: 'bg-red-500',
    CS2: 'bg-orange-600',
    LEAGUE_OF_LEGENDS: 'bg-blue-500',
    ROCKET_LEAGUE: 'bg-indigo-500',
    OTHER: 'bg-gray-500',
  }
  return colors[gameType] || 'bg-gray-500'
}

export function getGameIcon(gameType: string): string {
  const icons: Record<string, string> = {
    PUBG_MOBILE: '🎯',
    COD_MOBILE: '🔫',
    FREE_FIRE: '🔥',
    FC_26: '⚽',
    VALORANT: '🎭',
    CS2: '💣',
    LEAGUE_OF_LEGENDS: '⚔️',
    ROCKET_LEAGUE: '🚗',
    OTHER: '🎮',
  }
  return icons[gameType] || '🎮'
}

export function calculateELOChange(
  playerRating: number,
  opponentRating: number,
  won: boolean,
  kFactor: number = 32
): number {
  const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400))
  const actualScore = won ? 1 : 0
  return Math.round(kFactor * (actualScore - expectedScore))
}
