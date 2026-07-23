import { NextRequest, NextResponse } from 'next/server';
import { analyzeText } from '@/lib/detector';
import { parseFile } from '@/lib/parser';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { code: 40001, message: 'File is required', data: null },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { code: 40002, message: 'File size must not exceed 10MB', data: null },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedExtensions = ['pdf', 'docx', 'txt'];
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!allowedExtensions.includes(ext)) {
      return NextResponse.json(
        { code: 40003, message: 'Supported formats: PDF, DOCX, TXT', data: null },
        { status: 400 }
      );
    }

    // Parse the file to extract text
    const buffer = await file.arrayBuffer();
    const text = await parseFile(buffer, file.name);

    // Analyze the extracted text
    const result = await analyzeText(text, file.name);

    return NextResponse.json({
      code: 0,
      message: 'success',
      data: result,
    });
  } catch (error) {
    console.error('File detection error:', error);
    return NextResponse.json(
      { code: 50001, message: '检测失败，请重试', data: null },
      { status: 500 }
    );
  }
}
