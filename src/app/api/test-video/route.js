import { NextResponse } from 'next/server';
import { parseVideoUrl, fetchAutoPosterFrame } from '@/lib/videoUtils';

export async function GET() {
const sampleUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

const parsed = parseVideoUrl(sampleUrl);
const poster = await fetchAutoPosterFrame(sampleUrl);

return NextResponse.json({ parsed, poster });
}