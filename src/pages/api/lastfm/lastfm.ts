import axios from "axios";
import { searchSpotifyForAlbumCover } from "../spotify/spotify-new-releases";

const API_KEY = "1a683a3bff554bed77e6d5e89b7d5a63";
const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

export interface Track {
  name: string;
  artist: { name: string };
  url: string;
  playcount: string;
  image: string; // 추가
}

// 컴포넌트에서 import 가능하도록 export
export async function fetchTopTracks(): Promise<Track[]> {
  try {
    // 1. Last.fm에서 트랙 목록 가져오기
    const res = await axios.get(BASE_URL, {
      params: {
        method: "tag.getTopTracks",
        tag: "k-pop",
        api_key: API_KEY,
        format: "json",
        limit: 10,
      },
    });

    const rawTracks: any[] = res.data.tracks.track;
    
    // 2. 트랙 목록을 순회하며 Spotify 이미지 검색 요청
    const trackWithImages = rawTracks.map(async (rawTracks) => {
      const artistName = rawTracks.artist.name;
      const trackName = rawTracks.name;

      let ImgUrl = '';

      try {
        // 3. Spotify API 호출
        ImgUrl = await searchSpotifyForAlbumCover(artistName, trackName) || "";
      } catch (err) {
        console.error(`이미지 검색 실패 (${artistName} - ${trackName}):`, err);
        ImgUrl = "";
      }

      // 4. 이미지 반환
      const track: Track = {
        name: trackName,
        artist: { name: artistName },
        url: rawTracks.url,
        playcount: rawTracks.playcount,
        image: ImgUrl || "",
      };
      return track;
    });

    // 5. 모든 비동기 작업(Spotify 요청)이 완료될 때까지 기다립니다.
    const finalTracks = await Promise.all(trackWithImages);

    return finalTracks;
    
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    return [];
  }
}
