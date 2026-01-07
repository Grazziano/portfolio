import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const error = url.searchParams.get('error') ?? '';
  return NextResponse.json({ ok: true, error });
}
