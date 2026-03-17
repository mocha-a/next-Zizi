//토큰
//interface : 어떤 객체가 가져야 할 속성 이름과 타입을 미리 정해두는 것!
export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function getSpotifyAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify client ID or secret in environment variables.');
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to get Spotify token');
  }

  const data: SpotifyTokenResponse = await res.json();
  return data.access_token;
}