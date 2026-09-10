'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn, getGameIcon, getGameColor, formatCurrency } from '@/lib/utils'

interface Match {
  id: string
  matchNumber: number
  status: string
  scheduledAt?: string | null
  participants: Array<{
    participant: {
      player?: { id: string; username: string; avatarUrl?: string | null } | null
      team?: { id: string; name: string; tag?: string | null } | null
    }
    position: number
    score?: number | null
    winner?: boolean | null
  }>
  nextMatchId?: string | null
}

interface Round {
  id: string
  roundNumber: number
  name?: string | null
  matches: Match[]
}

interface BracketViewerProps {
  rounds: Round[]
  tournamentName: string
}

export function BracketViewer({ rounds, tournamentName }: BracketViewerProps) {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)
  
  const getParticipantName = (match: Match, position: number) => {
    const participant = match.participants.find(p => p.position === position)
    if (!participant) return 'TBD'
    
    if (participant.participant.player) {
      return participant.participant.player.username
    }
    if (participant.participant.team) {
      return participant.participant.team.tag || participant.participant.team.name
    }
    return 'TBD'
  }
  
  const getParticipantScore = (match: Match, position: number) => {
    const participant = match.participants.find(p => p.position === position)
    return participant?.score ?? null
  }
  
  const isWinner = (match: Match, position: number) => {
    const participant = match.participants.find(p => p.position === position)
    return participant?.winner ?? false
  }
  
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 min-w-max p-4">
        {rounds.map((round) => (
          <div key={round.id} className="flex flex-col gap-4">
            {/* Round Header */}
            <div className="text-center mb-2">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                {round.name || `Round ${round.roundNumber}`}
              </h3>
              <p className="text-xs text-gray-500">{round.matches.length} Matches</p>
            </div>
            
            {/* Matches in this round */}
            <div className="flex flex-col gap-4">
              {round.matches.map((match) => (
                <Card key={match.id} className="w-64 shrink-0" hover>
                  <CardContent className="p-0">
                    {/* Match Header */}
                    <div className="px-3 py-2 border-b border-gray-800 bg-gray-900/50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Match {match.matchNumber + 1}</span>
                        <span className={cn(
                          'text-xs px-2 py-0.5 rounded-full',
                          match.status === 'COMPLETED' && 'bg-green-500/20 text-green-400',
                          match.status === 'IN_PROGRESS' && 'bg-red-500/20 text-red-400 animate-pulse',
                          match.status === 'SCHEDULED' && 'bg-gray-500/20 text-gray-400'
                        )}>
                          {match.status === 'IN_PROGRESS' ? 'LIVE' : match.status}
                        </span>
                      </div>
                    </div>
                    
                    {/* Participants */}
                    <div className="p-3 space-y-2">
                      {[0, 1].map((position) => {
                        const participant = match.participants.find(p => p.position === position)
                        const isWinning = isWinner(match, position)
                        const score = getParticipantScore(match, position)
                        
                        return (
                          <div
                            key={position}
                            className={cn(
                              'flex items-center justify-between px-2 py-1.5 rounded-lg transition-all',
                              isWinning && 'bg-green-500/10 border border-green-500/30',
                              !isWinning && 'bg-gray-800/50'
                            )}
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              {participant?.participant.player?.avatarUrl ? (
                                <img
                                  src={participant.participant.player.avatarUrl}
                                  alt=""
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                              ) : (
                                <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-xs', getGameColor('OTHER'))}>
                                  {getGameIcon('OTHER')}
                                </div>
                              )}
                              <span className={cn(
                                'text-sm font-medium truncate',
                                isWinning ? 'text-green-400' : 'text-gray-300'
                              )}>
                                {getParticipantName(match, position)}
                              </span>
                            </div>
                            {score !== null && (
                              <span className={cn(
                                'text-sm font-bold ml-2',
                                isWinning ? 'text-green-400' : 'text-gray-500'
                              )}>
                                {score}
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    
                    {/* Schedule Info */}
                    {match.scheduledAt && (
                      <div className="px-3 pb-3">
                        <p className="text-xs text-gray-500">
                          📅 {new Date(match.scheduledAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
