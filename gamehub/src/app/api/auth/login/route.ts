import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { loginSchema } from '@/lib/validations'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = loginSchema.parse(body)
    
    // Find user by email
    const player = await prisma.player.findUnique({
      where: { email: validatedData.email },
      select: {
        id: true,
        email: true,
        username: true,
        passwordHash: true,
        avatarUrl: true,
        rating: true,
        isVerified: true,
        createdAt: true,
      },
    })
    
    if (!player) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(validatedData.password, player.passwordHash)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { playerId: player.id, email: player.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )
    
    // Remove passwordHash from response
    const { passwordHash, ...playerWithoutPassword } = player
    
    return NextResponse.json({
      player: playerWithoutPassword,
      token,
    })
    
  } catch (error) {
    console.error('Login error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: (error as any).errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
