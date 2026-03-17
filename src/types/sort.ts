export type AlbumCategoryType = 'main' | 'appears_on' | 'compilation';
export type AlbumSortType = 'name' | 'new' | 'old' | null;
export type PlaylistSortType = 'name' | 'tracks' | null;
export type ArtistSortType = 'name' | 'popularity' | null;

export const AlbumCategoryOptions = [
  { label: '정규 / 싱글', value: 'main' },
  { label: '참여 앨범', value: 'appears_on' },
  { label: '모음집', value: 'compilation' },
] as const;

export const AlbumSortOptions = [
  { label: '가나다 순', value: 'name' },
  { label: '최신 순', value: 'new' },
  { label: '오래된 순', value: 'old' },
] as const;

export const ArtistSortOptions = [
  { label: '인기순', value: 'popularity' },
  { label: '가나다 순', value: 'name' },
] as const;

export const PlaylistSortOptions = [
  { label: '가나다 순', value: 'name' },
  { label: '곡 많은 순', value: 'tracks' },
] as const;