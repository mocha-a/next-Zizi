export interface TrackItemData {
  image: string;
  name: string;
  artist: { name: string };
}

export type PlayableTrack = {
  name: string;
  artist: { name: string };
};