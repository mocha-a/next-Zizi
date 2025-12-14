'use client';

import 'swiper/css'; // 기본 스타일
import GetDailyMood from './GetDailyMood';

function Mood() {
  const moodOfToday = GetDailyMood(); // 오늘의 무드를 결정하는 함수 불러오기

  if (!moodOfToday) return null; // 값이 없으면 null return
  
  return (
    <div className="mood-container">
      <span>today is...</span>
      <span>{moodOfToday.icon}</span>
      <b>{moodOfToday.kor}</b>
    </div>
  )
}

export default Mood