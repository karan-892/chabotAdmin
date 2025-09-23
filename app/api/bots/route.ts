import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/utils-server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/bots - Get all bots for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bots = await prisma.bot.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        _count: {
          select: {
            conversations: true,
          },
        },
      },
    });

    return NextResponse.json({ bots });
  } catch (error) {
    console.error('Error fetching bots:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/bots - Create a new bot
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, avatar, config, isPublic, knowledgeBase } = body;

    if (!name) {
      return NextResponse.json({ error: 'Bot name is required' }, { status: 400 });
    }

    // Generate API key for the bot
    const apiKey = `bp_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

    const bot = await prisma.bot.create({
  data: {
    name,
    description: description || '',
    avatar: avatar || '',
    isPublic: isPublic || false,
    userId: session.user.id,
    apiKey,
    config: config ,
    knowledgeBase: {
      create: knowledgeBase?.map((kb: any) => ({
        title: kb.title || kb.type || "Untitled",
        content: kb.content,
        metadata: {
          status: kb.status,
          type: kb.type,
        },
      })) || [],
    },
  },
});


    return NextResponse.json({ bot }, { status: 201 });
  } catch (error) {
    console.error('Error creating bot:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}