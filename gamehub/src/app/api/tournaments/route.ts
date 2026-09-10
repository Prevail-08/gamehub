import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const game = searchParams.get('game')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    
    // Build where clause
    const where: any = {
      isPublic: true,
    }
    
    if (game && game !== 'ALL') {
      where.game = game
    }
    
    if (status) {
      where.status = status
    }
    
    // Fetch tournaments with pagination
    const [tournaments, total] = await Promise.all([
      prisma.tournament.findMany({
        where,
        include: {
          creator: {
            select: {
              id: true,
              username: true,
              avatarUrl: true,
            },
          },
          participants: {
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          startDate: 'asc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.tournament.count({ where }),
    ])
    
    // Transform data for response
    const transformedTournaments = tournaments.map((t) => ({
      ...t,
      currentParticipants: t.participants.length,
      participants: undefined,
    }))
    
    return NextResponse.json({
      tournaments: transformedTournaments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
    
  } catch (error) {
    console.error('Error fetching tournaments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tournaments' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // In a real app, you'd validate the JWT token and get the creatorId
    // For now, we'll use a placeholder
    const creatorId = body.creatorId
    
    if (!creatorId) {
      return NextResponse.json(
        { error: 'Creator ID is required' },
        { status: 400 }
      )
    }
    
    // Create tournament
    const tournament = await prisma.tournament.create({
      data: {
        name: body.name,
        description: body.description,
        game: body.game,
        format: body.format,
        maxParticipants: body.maxParticipants,
        entryFee: body.entryFee || 0,
        prizePool: body.prizePool || 0,
        prizeDistribution: body.prizeDistribution,
        rules: body.rules,
        bracketType: body.bracketType || 'SINGLE_ELIMINATION',
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        registrationDeadline: body.registrationDeadline ? new Date(body.registrationDeadline) : null,
        isPublic: body.isPublic ?? true,
        isFeatured: body.isFeatured ?? false,
        coverImageUrl: body.coverImageUrl,
        creator: {
          connect: { id: creatorId },
        },
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    })
    
    return NextResponse.json(tournament, { status: 201 })
    
  } catch (error) {
    console.error('Error creating tournament:', error)
    return NextResponse.json(
      { error: 'Failed to create tournament' },
      { status: 500 }
    )
  }
}
