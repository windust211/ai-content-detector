import { NextRequest, NextResponse } from 'next/server';
import { analyzeText } from '@/lib/detector';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { code: 40001, message: 'Text is required and must be a string', data: null },
        { status: 400 }
      );
    }

    const trimmed = text.trim();
    if (trimmed.length < 50) {
      return NextResponse.json(
        { code: 40002, message: 'Text must be at least 50 characters for analysis', data: null },
        { status: 400 }
      );
    }

    if (trimmed.length > 30000) {
      return NextResponse.json(
        { code: 40003, message: 'Text must not exceed 30,000 characters', data: null },
        { status: 400 }
      );
    }

    const result = await analyzeText(trimmed);

    return NextResponse.json({
      code: 0,
      message: 'success',
      data: result,
    });
  } catch (error) {
    console.error('Text detection error:', error);
    return NextResponse.json(
      { code: 50001, message: '检测失败，请重试', data: null },
      { status: 500 }
    );
  }
}
