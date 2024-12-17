export const dynamic = 'force-dynamic'; // 동적 렌더링 강제
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const encodedUrl = searchParams.get('url');
    if (!encodedUrl) {
      return NextResponse.json(
        {
          error: 'url parameter is required',
        },
        {
          status: 400,
        },
      );
    }
    const targetUrl = decodeURIComponent(encodedUrl);
    console.log('targetUrl : ', targetUrl);
    const externalResponse = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!externalResponse.ok) {
      throw new Error('Failed to fetch data from the provided URL');
    }
    return externalResponse;
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
}
