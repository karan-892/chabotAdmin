import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/utils-server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/bots/[botId] - Get a specific bot
export async function GET(
  request: NextRequest,
  { params }: { params: { botId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bot = await prisma.bot.findFirst({
      where: {
        id: params.botId,
        userId: session.user.id,
      },
      include: {
        _count: {
          select: {
            conversations: true,
          },
        },
      },
    });

    if (!bot) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
    }

    return NextResponse.json({ bot });
  } catch (error) {
    console.error('Error fetching bot:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/bots/[botId] - Update a bot
export async function PUT(
  request: NextRequest,
  { params }: { params: { botId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, avatar, config, flows, intents, entities, status } = body;

    const bot = await prisma.bot.findFirst({
      where: {
        id: params.botId,
        userId: session.user.id,
      },
    });

    if (!bot) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
    }

    const updatedBot = await prisma.bot.update({
      where: { id: params.botId },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(avatar !== undefined && { avatar }),
        ...(config && { config }),
        ...(flows && { flows }),
        ...(intents && { intents }),
        ...(entities && { entities }),
        ...(status && { status }),
      },
    });

    return NextResponse.json({ bot: updatedBot });
  } catch (error) {
    console.error('Error updating bot:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/bots/[botId] - Delete a bot
export async function DELETE(
  request: NextRequest,
  { params }: { params: { botId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bot = await prisma.bot.findFirst({
      where: {
        id: params.botId,
        userId: session.user.id,
      },
    });

    if (!bot) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
    }

    await prisma.bot.delete({
      where: { id: params.botId },
    });

    return NextResponse.json({ message: 'Bot deleted successfully' });
  } catch (error) {
    console.error('Error deleting bot:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}