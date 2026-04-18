import { create } from "zustand";
// import { Track } from "@/types/deezer/deezer";

interface PlayerStore {
    trackId: number | null;
    // isPlaying: boolean;
    isOpen: boolean;
    // audio: HTMLAudioElement | null;

    // setCurrentTrack: (track: Track) => void;
    // setExpanded: (expanded: boolean) => void;
    // togglePlay: () => void;
    play: (id: any) => void;
    closePlayer: () => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  trackId: null,
  isOpen: false,
  play: (id) => set({ 
    trackId: id, 
    isOpen: true // 노래를 넣으면 자동으로 팝업 열기
  }),
  closePlayer: () => set({ isOpen: false, trackId: null }),

  //   setCurrentTrack: (track) => {
  //       const { audio } = get();

  //       if (audio) {
  //           audio.pause(); // 이전 곡 정지
  //           audio.src = "";
  //       }

  //       const newAudio = new Audio(track.preview); // 30초 미리듣기 URL
  //       newAudio.play();

  //       newAudio.onended = () => set({ isPlaying: false });

  //       set({ currentTrack: track, isPlaying: true, audio: newAudio, isExpanded: false });
  //   },

  //   setExpanded: (expanded) => set({ isExpanded: expanded }),

  //   togglePlay: () => {
  //   const { audio, isPlaying } = get();
  //   if (!audio) return;

  //   if (isPlaying) {
  //     audio.pause();
  //   } else {
  //     audio.play();
  //   }
  //   set({ isPlaying: !isPlaying });
  // },

  // closePlayer: () => {
  //   const { audio } = get();
  //   if (audio) {
  //     audio.pause();
  //     audio.src = "";
  //   }
  //   set({ currentTrack: null, isPlaying: false, isExpanded: false, audio: null });
  // },
}));