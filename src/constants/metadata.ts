// ========================
// Genre
// ========================

// 렌더링에서 제외할 장르
export const excludedGenres = ["Asian Music", "Indian Music" ];

// 장르 맵핑
export const genreMap: Record<string, string> = {
  "Films/Games": "OST",
  "Film Scores": "OST",
  "Rap/Hip Hop": "Hip-Hop",
  "African Music": "African Pop",
  "Asian Music": "Asian Pop",
  "Brazilian Music": "Brazilian Pop",
  "Indian Music": "Indian Pop",
  "Latin Music": "Latin Pop",
};

// ========================
// recordType
// ========================

export const RECORD_TYPE_MAP: Record<string, string> = {
  "album": "정규",
  "single": "싱글",
  "ep": "EP",
  "compilation": "모음집",
};

// ========================
// tag UI
// ========================
export interface TagItem {
  id: string;
  name: string;
}

// 태그 리스트
export const TAG_LIST: TagItem[] = [
  { id: 'tracks', name: '곡' },
  { id: 'artists', name: '아티스트' },
  { id: 'albums', name: '앨범' },
  { id: 'playlists', name: '플레이리스트' },
]

// ========================
// API type (DB enum 변환)
// ========================
export const typeMap = {
  artist: 'ARTIST',
  track: 'TRACK',
  album: 'ALBUM',
  playlist: 'PLAYLIST',
} as const;