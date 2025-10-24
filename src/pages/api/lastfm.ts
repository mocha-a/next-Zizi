import axios from "axios";

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
    const res = await axios.get(BASE_URL, {
      params: {
        method: "tag.getTopTracks",
        tag: "k-pop",
        api_key: API_KEY,
        format: "json",
        limit: 10,
      },
    });

    const tracks: Track[] = res.data.tracks.track;
    return tracks; // 콘솔이 아니라 데이터를 반환
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    return [];
  }
}
