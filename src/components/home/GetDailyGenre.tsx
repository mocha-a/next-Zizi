'use client';

import { useState, useEffect } from 'react';
import { allTags } from '@/constants/chartTags';

export function GetDailyGenre() {
    const today = new Date().toDateString();  // 오늘 날짜
    const [genre, setGenre] = useState<{ name: string; id: string } | null>(null);

    useEffect(()=>{
        const saved = localStorage.getItem('dailyGenre');
        const savedDate = localStorage.getItem('dailyGenreDate');

        if ( saved && savedDate === today ) {
            setGenre(JSON.parse(saved));
        } else {
            const rand = allTags.genre[Math.floor(Math.random() * allTags.genre.length)];
            setGenre(rand);
            localStorage.setItem('dailyGenre', JSON.stringify(rand));
            localStorage.setItem('dailyGenreDate', today);
        }
    },[today]);

    return genre;
}

export default GetDailyGenre