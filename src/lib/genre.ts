import { excludedGenres, genreMap } from "@/constants/metadata";

export function getUniqueGenres(genres?: { name: string }[]) {
  if (!genres) return [];

  const mappedGenres = genres
    .filter(genre => !excludedGenres.includes(genre.name)) // excludedGenres장르 제거 
    .map(genre => genreMap[genre.name] || genre.name);     // 장르 맵핑

  return [...new Set(mappedGenres)]; // 중복 제거
}