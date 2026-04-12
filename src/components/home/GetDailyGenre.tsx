'use client';

import { getAllGenre } from '@/lib/api/genre';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface GenreTypes {
  id: string;
  name: string;
  icon?: string;
}

export function GetDailyGenre() {
    const today = new Date().toDateString();  // 오늘 날짜
    const [dailyGenre, setDailyGenre] = useState<GenreTypes | null>(null);

    const { data: genreList, isLoading } = useQuery({
        queryKey: ['genres'],
        queryFn: getAllGenre,
        staleTime: 1000 * 60 * 60 * 24,
    });

    useEffect(()=>{
        // 1. API 로딩 중이면 중단
        if (!genreList || genreList.length === 0 || isLoading) return;

        const saved = localStorage.getItem('dailyGenre');
        const savedDate = localStorage.getItem('dailyGenreDate');

        // 2. 오늘 날짜로 저장된 데이터가 있다면 그대로 사용
        if ( saved && savedDate === today ) {
            setDailyGenre(JSON.parse(saved));
        } else {
            // 3. 없다면 랜덤 추출
            const rand = genreList[Math.floor(Math.random() * genreList.length)];
            
            // 4. 상태 업데이트 및 저장
            setDailyGenre(rand);
            localStorage.setItem('dailyGenre', JSON.stringify(rand));
            localStorage.setItem('dailyGenreDate', today);
        }
    },[genreList, today]);

    return { dailyGenre };
}

export default GetDailyGenre