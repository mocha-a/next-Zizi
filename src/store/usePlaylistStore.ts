import { create } from 'zustand';
import { SearchTrack } from '@/types/deezer/search';

// export interface Song {
//   id: string;
//   title: string;
//   artist: string;
//   imageUrl?: string;
// }

interface PlaylistStore {
  selectedSongs: SearchTrack[];

  setSelectedSongs: (songs: SearchTrack[]) => void;

  addSong: (song: SearchTrack) => void;

  removeSong: (songId: string) => void;

  clearSongs: () => void;
}

export const usePlaylistStore = create<PlaylistStore>((set) => ({
  selectedSongs: [],

  setSelectedSongs: (songs) =>
    set({ selectedSongs: songs }),

  addSong: (song) =>
    set((state) => {
      const exists = state.selectedSongs.some(
        (item) => item.id === song.id
      );

      if (exists) {
        return state;
      }

      return {
        selectedSongs: [...state.selectedSongs, song],
      };
    }),

  removeSong: (songId) =>
    set((state) => ({
      selectedSongs: state.selectedSongs.filter(
        (song) => song.id !== Number(songId)
      ),
    })),

  clearSongs: () =>
    set({
      selectedSongs: [],
    }),
}));