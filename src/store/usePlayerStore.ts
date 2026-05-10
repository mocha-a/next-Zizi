import { create } from "zustand";
// import { Track } from "@/types/deezer/deezer";

interface PlayerStore {
  trackId: number | string | null;
  trackTitle: string | null;
  artist: string | null;
  isOpen: boolean;
  
  play: (data: { id: number | string; title: string; artist: string }) => void;
  closePlayer: () => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  trackId: null,
  trackTitle: null,
  artist: null,
  isOpen: false,

  play: (data) => set({ 
    isOpen: true, 
    trackId: data.id, 
    trackTitle: data.title,
    artist: data.artist
  }),
  
  closePlayer: () => set({ 
    isOpen: false, 
    trackId: null, 
    trackTitle: null, 
    artist: null 
  }),

}));