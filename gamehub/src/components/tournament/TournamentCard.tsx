import React from 'react'
import { cn } from '@/lib/utils'
import { getGameIcon, getGameColor } from '@/lib/utils'

interface TournamentCardProps {
  id: string
  name: string
  game: string
  startDate: string
  maxParticipants: number
  currentParticipants: number
  prizePool: number
  entryFee: number
  status: string
  coverImageUrl?: string | null
  onClick?: () => void
}

export function TournamentCard({
  id,
  name,
  game,
  startDate,
  maxParticipants,
  currentParticipants,
  prizePool,
  entryFee,
  status,
  coverImageUrl,
  onClick,
}: TournamentCardProps) {
  const isFull = currentParticipants >= maxParticipants
  const isRegistrationClosed = status === 'REGISTRATION_CLOSED' || status === 'IN_PROGRESS' || status === 'COMPLETED'
  
  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100)
  }
  
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(dateString))
  }
  
  const getStatusBadge = () => {
    const statusConfig: Record<string, { label: string; color: string }> = {
      REGISTRATION_OPEN: { label: 'Open', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      REGISTRATION_CLOSED: { label: 'Closed', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      IN_PROGRESS: { label: 'Live', color: 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse' },
      COMPLETED: { label: 'Completed', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
      CANCELLED: { label: 'Cancelled', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
    }
    
    const config = statusConfig[status] || { label: status, color: 'bg-gray-500/20 text-gray-400' }
    
    return (
      <span className={cn('px-2 py-0.5 text-xs font-medium rounded-full border', config.color)}>
        {config.label}
      </span>
    )
  }
  
  return (
    <div
      onClick={onClick}
      className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300 cursor-pointer"
    >
      {/* Cover Image */}
      <div className="relative h-32 overflow-hidden">
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className={cn('w-full h-full flex items-center justify-center', getGameColor(game))}>
            <span className="text-4xl">{getGameIcon(game)}</span>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          {getStatusBadge()}
        </div>
        
        {/* Game Type Badge */}
        <div className="absolute bottom-2 left-2">
          <span className="px-2 py-1 text-xs font-medium bg-black/60 backdrop-blur-sm rounded-lg text-white flex items-center gap-1">
            {getGameIcon(game)} {game.replace(/_/g, ' ')}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{name}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">📅 {formatDate(startDate)}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">👥 Participants</span>
            <span className={cn('font-semibold', isFull ? 'text-red-400' : 'text-white')}>
              {currentParticipants}/{maxParticipants}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">💰 Prize Pool</span>
            <span className="font-semibold text-green-400">{formatCurrency(prizePool)}</span>
          </div>
          
          {entryFee > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">🎫 Entry Fee</span>
              <span className="font-semibold text-yellow-400">{formatCurrency(entryFee)}</span>
            </div>
          )}
        </div>
        
        {/* CTA Button */}
        <button
          disabled={isFull || isRegistrationClosed}
          className={cn(
            'w-full py-2 px-4 rounded-lg font-semibold transition-all',
            isFull || isRegistrationClosed
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-500/25'
          )}
        >
          {isFull ? 'Tournament Full' : isRegistrationClosed ? 'Registration Closed' : 'Join Now'}
        </button>
      </div>
    </div>
  )
}
