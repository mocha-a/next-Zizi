export type AlbumSortType = AlbumSortValue | null;
export type ArtistSortType = ArtistSortValue | null;
export type TrackSortType = TrackSortValue | null;
export type PlaylistSortType = PlaylistSortValue | null;

export type AlbumSortValue =
  (typeof AlbumSortOptions)[number]['value'];

export type ArtistSortValue =
  (typeof ArtistSortOptions)[number]['value'];

export type TrackSortValue =
  (typeof TrackSortOptions)[number]['value'];

export type PlaylistSortValue =
  (typeof PlaylistSortOptions)[number]['value'];

export const AlbumSortOptions = [
  { label: '가나다 순', value: 'title' },
  { label: '아티스트 순', value: 'artist' },
  { label: '곡 많은 순', value: 'tracks_desc' },
  { label: '곡 적은 순', value: 'tracks_asc' },
] as const;

export const ArtistSortOptions = [
  { label: '가나다 순', value: 'name' },
  { label: '인기순', value: 'fans' },
  { label: '앨범 많은 순', value: 'albums' },
] as const;

export const TrackSortOptions = [
  { label: '인기순', value: 'rank' },
  { label: '가나다 순', value: 'title' },
  { label: '아티스트 순', value: 'artist' },
  { label: '짧은 순', value: 'duration_asc' },
  { label: '긴 순', value: 'duration_desc' },
] as const;

export const PlaylistSortOptions = [
  { label: '가나다 순', value: 'title' },
  { label: '곡 많은 순', value: 'tracks_desc' },
  { label: '곡 적은 순', value: 'tracks_asc' },
  { label: '업데이트 순', value: 'updated' },
  { label: '오래된 순', value: 'oldest' },
] as const;



export type AlbumDetailSortType = AlbumDetailSortValue | null;

export type AlbumDetailSortValue =
  (typeof AlbumDetailSortOptions)[number]['value'];

export const AlbumDetailSortOptions = [
  { label: '가나다 순', value: 'title' },
  { label: '최신순', value: 'latest' },
  { label: '오래된 순', value: 'oldest' },
  { label: '인기순', value: 'fans' },
] as const;