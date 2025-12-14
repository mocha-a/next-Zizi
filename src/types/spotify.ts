// spotify type 정의

// 전체
export interface AllResults {
  artists?: { items: Artist[] };
  albums?: { items: Album[] };
  tracks?: { items: Track[] };
  playlists?: { items: Playlist[] };
}

export interface Artist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  images: { url: string; height: number; width: number }[];
  followers: { href: string | null; total: number };
  external_urls: { spotify: string };
}

export interface Track {
  id: string;
  name: string;
  duration_ms: number;
  popularity: number;
  preview_url: string | null;
  external_urls: { spotify: string };
  album: { 
    id: string; 
    name: string; 
    images: { url: string; height: number; width: number }[] 
    };
  artists: { id: string; name: string }[];
}

export interface Album {
  album_type: string;
  total_tracks: number;
  href: string;
  id: string;
  images: { height: number; url: string; width: number }[];
  name: string;
  release_date: string;
  artists: { id: string; name: string }[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string; width: number; height: number }[];
  owner: { 
    display_name: string; 
    id: string; 
    external_urls: { spotify: string } 
  };
  public: boolean;
  collaborative: boolean;
  tracks: { 
    href: string; 
    total: number 
  };
  external_urls: { spotify: string };
}