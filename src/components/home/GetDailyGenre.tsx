'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllGenre } from '@/lib/api/genre';

interface GenreTypes {
  id: string;
  name: string;
  icon?: string;
}

export function GetDailyGenre() {
    const today = new Date().toDateString();  // 오늘 날짜

    const [dailyGenre, setDailyGenre] = useState<GenreTypes | null>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('dailyGenre');
            const savedDate = localStorage.getItem('dailyGenreDate');
            if ( saved && savedDate === today ) {
                try {
                    return JSON.parse(saved); // 저장된 값이 있으면 사용
                } catch {
                    return null;
                }
            }
        }
        return null; // 저장된 게 없으면 null
    });

    const { data: genreList, error } = useQuery({
        queryKey: ['genres'],
        queryFn: getAllGenre,
        staleTime: 1000 * 60 * 60 * 24,
    });

    useEffect(()=>{
        // 이미 초기값으로 dailyGenre가 설정되었다면 추가 로직 수행 안 함
        if (dailyGenre) return; 

        // API에서 장르 리스트가 오면 그때 랜덤으로 뽑아서 세팅
        if (genreList && genreList.length > 0) {
        const rand = genreList[Math.floor(Math.random() * genreList.length)];
            setDailyGenre(rand);
            localStorage.setItem('dailyGenre', JSON.stringify(rand));
            localStorage.setItem('dailyGenreDate', today);
        } 
        else if (error) {
        // API 에러 시 기본값 세팅
        const fallback = { id: "132", name: "Pop" };
        setDailyGenre(fallback);
        }
    },[genreList, today, dailyGenre, error]);

    return { dailyGenre };
}

export default GetDailyGenre