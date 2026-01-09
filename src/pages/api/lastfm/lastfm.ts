// pages/api/tracks.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";
import { getSpotifyAccessToken } from '@/lib/spotify';

const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const BASE_URL = "https://ws.audioscrobbler.com/2.0/";
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

export interface Track {
  name: string;
  artist: { name: string };
  url: string;
  playcount: number;
  image: string;
}

interface RawTrack {
  name: string;
  url: string;
  playcount: string;
  artist: {
    name: string;
    url?: string;
  };
  image: {
    ['#text']: string;
    size: string;
  }[];
}

// API Route  //default : Next.js의 API Route(서버 전용 엔드포인트) 를 만드는 코드 ! !
export default async function handler(req: NextApiRequest, res: NextApiResponse<Track[] | { message: string }>) {
  try {
    // req.query에서 tag 값 추출
    const tag = Array.isArray(req.query.tag) ? req.query.tag[0] : req.query.tag;

    const tracks = await fetchTopTracks(tag);
    res.status(200).json(tracks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '트랙 가져오기 실패' });
  }
}

// 캐싱용 Map
const spotifyImageCache = new Map<string, string>();

async function fetchTopTracks(tag?: string): Promise<Track[]> {

  try {
    const finalTag = tag || 'k-pop';
    // Last.fm 트랙 가져오기
    const res = await axios.get(BASE_URL, {
      params: {
        method: "tag.getTopTracks",
        tag: finalTag,
        api_key: LASTFM_API_KEY,
        format: "json",
        limit: 100,
      },
    });

    const rawTracks: RawTrack[] = res.data.tracks.track;

    const trackWithImages = rawTracks.map(async (rawTrack) => {
      const artistName = rawTrack.artist.name;
      const trackName = rawTrack.name;
      const key = `${artistName}-${trackName}`;

      let ImgUrl = '';

      if (spotifyImageCache.has(key)) {
        ImgUrl = spotifyImageCache.get(key)!;
      } else {
        try {
          ImgUrl = await searchSpotifyForAlbumCover(artistName, trackName) || "";
          spotifyImageCache.set(key, ImgUrl);
        } catch (err) {
          console.error(`이미지 검색 실패 (${artistName} - ${trackName}):`, err);
          ImgUrl = "";
        }
      }

      return {
        name: trackName,
        artist: { name: artistName },
        url: rawTrack.url,
        playcount: parseInt(rawTrack.playcount, 10) || 0,
        image: ImgUrl,
      };
    });

    return await Promise.all(trackWithImages);

  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    return [];
  }
}

async function searchSpotifyForAlbumCover(artistName: string, trackName: string): Promise<string | null> {
  try {
    const accessToken = await getSpotifyAccessToken();
    if (!accessToken) return null;

    const query = `track:"${trackName}" artist:"${artistName}"`;

    const apiRes = await fetch(
      `${SPOTIFY_API_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!apiRes.ok) return null;

    const data = await apiRes.json();
    return data.tracks?.items?.[0]?.album?.images?.[2]?.url ?? null;
  } catch (err) {
    console.error('Spotify track search error:', err);
    return null;
  }
}
