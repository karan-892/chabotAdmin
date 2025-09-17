import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/chat/[botId] - Handle chat messages
export async function POST(
  request: NextRequest,
  { params }: { params: { botId: string } }
) {
  try {
    const body = await request.json();
    const { message, sessionId, userId } = body;

    if (!message || !sessionId) {
      return NextResponse.json({ error: 'Message and sessionId are required' }, { status: 400 });
    }

    // Get bot configuration
    const bot = await prisma.bot.findUnique({
      where: { id: params.botId },
    });

    if (!bot) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
    }

    if (bot.status !== 'DEPLOYED') {
      return NextResponse.json({ error: 'Bot is not deployed' }, { status: 400 });
    }

    // Get or create conversation
    let conversation = await prisma.conversation.findFirst({
      where: {
        botId: params.botId,
        sessionId,
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          botId: params.botId,
          sessionId,
          userId: userId || null,
          messages: [],
          context: {},
        },
      });
    }

    // Add user message to conversation
    const messages = Array.isArray(conversation.messages) ? conversation.messages : [];
    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: message,
      timestamp: new Date().toISOString(),
    };

    messages.push(userMessage);

    // Process message and generate bot response
    const botResponse = await processMessage(message, bot, conversation);
    
    const botMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      text: botResponse.text,
      timestamp: new Date().toISOString(),
      ...(botResponse.quickReplies && { quickReplies: botResponse.quickReplies }),
    };

    messages.push(botMessage);

    // Update conversation
    await prisma.conversation.update({
      where: { id: conversation.id },
      data: {
        messages,
        context: botResponse.context || conversation.context,
      },
    });

    // Update bot analytics
    await updateBotAnalytics(params.botId);

    return NextResponse.json({
      response: botMessage,
      context: botResponse.context,
    });
  } catch (error) {
    console.error('Error processing chat message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Simple message processing function (can be enhanced with NLP)
async function processMessage(message: string, bot: any, conversation: any) {
  const config = bot.config || {};
  const flows = bot.flows || [];
  const context = conversation.context || {};

  // Simple keyword-based responses
  const lowerMessage = message.toLowerCase();

  // Check for greetings
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return {
      text: config.welcomeMessage || "Hello! How can I help you today?",
      context,
      quickReplies: ['How can you help me?', 'Tell me more', 'Contact support']
    };
  }

  // Check for help requests
  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return {
      text: "I'm here to help! You can ask me questions about our services, or I can connect you with a human agent.",
      context,
      quickReplies: ['Contact human agent', 'FAQ', 'Services']
    };
  }

  // Check for goodbye
  if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
    return {
      text: "Goodbye! Feel free to come back anytime if you need help.",
      context: { ...context, ended: true }
    };
  }

  // Default fallback response
  return {
    text: config.fallbackMessage || "I'm sorry, I didn't understand that. Could you please rephrase?",
    context,
    quickReplies: ['Start over', 'Contact support', 'Help']
  };
}

async function updateBotAnalytics(botId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.botAnalytics.upsert({
    where: {
      botId_date: {
        botId,
        date: today,
      },
    },
    update: {
      messages: { increment: 1 },
    },
    create: {
      botId,
      date: today,
      conversations: 0,
      messages: 1,
      uniqueUsers: 0,
    },
  });

  // Update bot total messages
  await prisma.bot.update({
    where: { id: botId },
    data: {
      totalMessages: { increment: 1 },
    },
  });
}