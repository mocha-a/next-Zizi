// src/store/searchStore.ts
import { create } from 'zustand';

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
    images: { url: string; height: number; width: number }[];
  };
  artists: { id: string; name: string }[];
}

export interface Album {
  id: string;
  name: string;
  images: { url: string; width: number; height: number }[];
  release_date: string;
  total_tracks: number;
  artists: { id: string; name: string }[];
  external_urls: { spotify: string };
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string; width: number; height: number }[];
  owner: {
    display_name: string;
    id: string;
    external_urls: { spotify: string };
  };
  public: boolean;
  collaborative: boolean;
  tracks: {
    href: string;
    total: number;
  };
  external_urls: { spotify: string };
}

export interface SpotifySearchResults {
  artists?: { items: Artist[] };
  albums?: { items: Album[] };
  tracks?: { items: Track[] };
  playlists?: { items: Playlist[] };
}

interface SearchState {
  results: SpotifySearchResults | null;
  setResults: (data: SpotifySearchResults | null) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  results: null,
  setResults: (data) => set({ results: data }),
}));