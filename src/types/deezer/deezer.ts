// deezer album Detail type 정의
import { SearchArtist, SearchTrack, SearchAlbum, SearchPlaylist } from '@/types/deezer/search';

// ======================================================
// artist
// ======================================================
export interface Artist extends SearchArtist {
  role?: "Main" | "Featuring"; // contributors에서만 사용
}

// ======================================================
// track
// ======================================================
export interface Track extends SearchTrack{
  title_short: string;
  title_version?: string;
  artist: Artist;              // 대표 아티스트 (Main)
  contributors?: Artist[];     // 참여 아티스트 (Featuring 등)
}

// ======================================================
// album
// ======================================================
export interface Album extends SearchAlbum{
  share: string;
  genres: {
    data: DeezerGenre[];
  };
  label: string;            //음반 발매 회사
  duration: number;         //초 단위
  fans: number;
  release_date: string;     // YYYY-MM-DD
  explicit_lyrics: boolean;
  artist: Artist;           // 대표 아티스트
  contributors?: Artist[];  // 앨범 참여 아티스트
  tracks: {
    data: Track[];
  };
}

// ======================================================
// playlist
// ======================================================
export interface Playlist extends SearchPlaylist{
  description: string;     //플레이리스트 설명
  duration: number;        //총 길이(초)
  fans: number;            //좋아요 수
  tracks?: {
    data: Track[];         // 상세 트랙 배열
  };
  creator: {
    name: string;
    picture_medium?: string;
  };
}

export interface DeezerGenre {
  id: number;
  name: string;
  picture?: string;
  type: "genre";
}