// deezer search type 정의

export type SearchCategory = 'artist' | 'track' | 'album' | 'playlist';

export interface EntityBase { id: string; name: string; }

// ======================================================
// all
// ======================================================
export interface AllResults {
  artists?: SearchArtist[];
  albums?: SearchAlbum[];
  tracks?: SearchTrack[];
  playlists?: SearchPlaylist[];
}

// ======================================================
// artist
// ======================================================
export interface SearchArtist {
  id: number;
  name: string;
  picture_medium: string;
  picture_xl: string;
  tracklist: string;
  nb_album: number;
  nb_fan: number;
  level?: {
    label: string;
    src?: string;
    className: string;
  } | null;
  type: "artist";
}

// ======================================================
// track
// ======================================================
export interface SearchTrack {
  album: SearchAlbum;
  artist: SearchArtist;
  id: number;
  title: string;
  duration: number; //총 길이
  explicit_lyrics: boolean; //19금
  isrc: string; //곡 주민번호
  preview: string; //30초 미리듣기
  rank: number; //인기
  type: "track";
}

// ======================================================
// album
// ======================================================
export interface SearchAlbum {
  artist: SearchArtist;
  id: number;
  title: string;
  cover_medium: string;
  genre_id: number;
  nb_tracks: number;
  record_type: string;
  tracklist: string;
  type: "album";
}

// ======================================================
// playlist
// ======================================================
export interface SearchPlaylist {
  id: number;
  title: string;
  creation_date: string;
  mod_date: string;
  tracklist: string;
  picture_medium: string;
  nb_tracks: number;
  user: {
    name: string;
  }
  type: "playlist";
}