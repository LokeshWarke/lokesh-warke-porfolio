import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioContent, savePortfolioContent, PortfolioContent } from '@/lib/content';

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(await getPortfolioContent());
}

export async function POST(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const content = await request.json() as PortfolioContent;
    if (!content?.profile || !content?.skills || !Array.isArray(content.projects)) {
      return NextResponse.json({ error: 'Invalid content format' }, { status: 400 });
    }
    await savePortfolioContent(content);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Could not save content' }, { status: 500 });
  }
}
