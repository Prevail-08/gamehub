import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const tournament = await prisma.tournament.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
        participants: {
          include: {
            player: {
              select: {
                id: true,
                username: true,
                avatarUrl: true,
                rating: true,
              },
            },
          },
        },
        rounds: {
          orderBy: { roundNumber: 'asc' },
          include: {
            matches: {
              include: {
                participants: {
                  include: {
                    participant: {
                      include: {
                        player: {
                          select: { id: true, username: true, avatarUrl: true },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        leaderboards: {
          orderBy: { rank: 'asc' },
          include: {
            participant: {
              include: {
                player: {
                  select: { id: true, username: true, avatarUrl: true },
                },
              },
            },
          },
        },
      },
    })
    
    if (!tournament) {
      return NextResponse.json(
        { error: 'Tournament not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(tournament)
    
  } catch (error) {
    console.error('Error fetching tournament:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tournament' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // In production, verify admin/creator permissions
    
    const tournament = await prisma.tournament.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        status: body.status,
        maxParticipants: body.maxParticipants,
        entryFee: body.entryFee,
        prizePool: body.prizePool,
        rules: body.rules,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        registrationDeadline: body.registrationDeadline 
          ? new Date(body.registrationDeadline) 
          : undefined,
      },
    })
    
    return NextResponse.json(tournament)
    
  } catch (error) {
    console.error('Error updating tournament:', error)
    return NextResponse.json(
      { error: 'Failed to update tournament' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // In production, verify admin/creator permissions
    
    await prisma.tournament.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Error deleting tournament:', error)
    return NextResponse.json(
      { error: 'Failed to delete tournament' },
      { status: 500 }
    )
  }
}
