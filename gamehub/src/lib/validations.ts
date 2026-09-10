import { z } from 'zod'

// Auth schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
})

// Tournament schemas
export const createTournamentSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(1000).optional(),
  game: z.enum(['PUBG_MOBILE', 'COD_MOBILE', 'FREE_FIRE', 'FC_26', 'VALORANT', 'CS2', 'LEAGUE_OF_LEGENDS', 'ROCKET_LEAGUE', 'OTHER']),
  format: z.enum(['SINGLE_ELIMINATION', 'DOUBLE_ELIMINATION', 'ROUND_ROBIN', 'SWISS', 'GROUP_STAGE']),
  maxParticipants: z.number().int().positive().max(256),
  entryFee: z.number().int().nonnegative(),
  prizePool: z.number().int().nonnegative(),
  startDate: z.string().datetime(),
  registrationDeadline: z.string().datetime().optional(),
  rules: z.string().max(5000).optional(),
  isPublic: z.boolean().default(true),
})

export const joinTournamentSchema = z.object({
  tournamentId: z.string().uuid(),
  teamId: z.string().uuid().optional(),
})

// Team schemas
export const createTeamSchema = z.object({
  name: z.string().min(2).max(50),
  tag: z.string().max(10).optional(),
  game: z.enum(['PUBG_MOBILE', 'COD_MOBILE', 'FREE_FIRE', 'FC_26', 'VALORANT', 'CS2', 'LEAGUE_OF_LEGENDS', 'ROCKET_LEAGUE', 'OTHER']),
  description: z.string().max(500).optional(),
})

export const invitePlayerSchema = z.object({
  teamId: z.string().uuid(),
  playerId: z.string().uuid(),
  role: z.enum(['CAPTAIN', 'CO_CAPTAIN', 'MEMBER', 'SUBSTITUTE']).default('MEMBER'),
})

// Match schemas
export const updateMatchResultSchema = z.object({
  matchId: z.string().uuid(),
  winnerId: z.string().uuid(),
  scores: z.array(z.object({
    participantId: z.string().uuid(),
    score: z.number().int().nonnegative(),
  })),
  statistics: z.record(z.unknown()).optional(),
})

// Profile schemas
export const updateProfileSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/).optional(),
  bio: z.string().max(500).optional(),
  country: z.string().length(2).optional(),
  avatarUrl: z.string().url().optional(),
})

// Export types
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type CreateTournamentInput = z.infer<typeof createTournamentSchema>
export type JoinTournamentInput = z.infer<typeof joinTournamentSchema>
export type CreateTeamInput = z.infer<typeof createTeamSchema>
export type InvitePlayerInput = z.infer<typeof invitePlayerSchema>
export type UpdateMatchResultInput = z.infer<typeof updateMatchResultSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
