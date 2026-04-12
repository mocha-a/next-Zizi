import { genreIcons } from "@/constants/genreIcons";
import { excludedGenres, genreMap } from "../genre";
import { api } from "./axios";

export const getAllGenre = async () => { 
  try {
    const res = await api.get('/deezer/genre');
    const rawRes = res.data.data;
    
    const processedGenres = rawRes
      .filter((genre: any) => !excludedGenres.includes(genre.name)) // 제외 장르 제거
      .map((genre: any) => {
        // 1. 이름 맵핑
        const mappedNme = genreMap[genre.name] || genre.name;

        return {
          ...genre,
          name: mappedNme,

          // 매핑된 이름을 기준으로 아이콘 추가 (없으면 기본값)
          icon: genreIcons[mappedNme] || genreIcons["default"]
        };
    });
  
    return processedGenres.slice(1) // genre = "all" 제거
  } catch (error) {
    console.error("장르 데이터 로드 실패:", error);
    return [];
  }
};