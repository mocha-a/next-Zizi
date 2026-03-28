export interface TrackItemData {
  image?: string;
  title: string;
  artist: { name: string };
}

export type PlayableTrack = {
  title: string;
  artist: { name: string };
};
