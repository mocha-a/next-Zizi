// 렌더링에서 제외할 장르
export const excludedGenres = ["Asian Music"];

// 장르 맵핑
export const genreMap: Record<string, string> = {
  "k-ballad": "발라드",
  "soundtrack": "OST",
  "K-Pop": "K-POP",
  "k-rock": "락",
  "k-rap": "랩",
  "Films/Games": "OST",
  "Film Scores": "OST",
  "Rap/Hip Hop": "Hip-Hop",
};

export function getUniqueGenres(genres?: { name: string }[]) {
  if (!genres) return [];

  const mappedGenres = genres
    .filter(genre => !excludedGenres.includes(genre.name)) // excludedGenres장르 제거 
    .map(genre => genreMap[genre.name] || genre.name);     // 장르 맵핑

  return [...new Set(mappedGenres)]; // 중복 제거
}