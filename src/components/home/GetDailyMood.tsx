import { useState, useEffect } from 'react';
import { allTags } from '@/constants/chartTags';

export function GetDailyMood() {
    const today = new Date().toDateString();  // 오늘 날짜
    const [mood, setMood] = useState<{ kor: string; eng: string; icon: string } | null>(null);

    useEffect(()=>{
        const saved = localStorage.getItem('dailyMood');
        const savedDate = localStorage.getItem('dailyMoodDate');

        if ( saved && savedDate === today ) {
            setMood(JSON.parse(saved));
        } else {
            const rand = allTags.mood[Math.floor(Math.random() * allTags.mood.length)];
            setMood(rand);
            localStorage.setItem('dailyMood', JSON.stringify(rand));
            localStorage.setItem('dailyMoodDate', today);
        }
    },[today]);

    return mood;
}

export default GetDailyMood