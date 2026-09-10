import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/validations'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = registerSchema.parse(body)
    
    // Check if user already exists
    const existingUser = await prisma.player.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { username: validatedData.username },
        ],
      },
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 400 }
      )
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(validatedData.password, 12)
    
    // Create user
    const player = await prisma.player.create({
      data: {
        email: validatedData.email,
        username: validatedData.username,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        rating: true,
        createdAt: true,
      },
    })
    
    // Generate JWT token
    const token = jwt.sign(
      { playerId: player.id, email: player.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )
    
    return NextResponse.json({
      player,
      token,
    }, { status: 201 })
    
  } catch (error) {
    console.error('Registration error:', error)
    
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
