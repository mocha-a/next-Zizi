'use client';

import 'swiper/css'; // 기본 스타일
import GetDailyGenre from './GetDailyGenre';

function Genre() {
  const { dailyGenre } = GetDailyGenre(); // 오늘의 무드를 결정하는 함수 불러오기

  if (!dailyGenre) return null; // 값이 없으면 null return
  
  return (
    <div className="mood-container" key={dailyGenre.id}>
      <span>today is...</span>
      <span>{dailyGenre.icon}</span>
      <b>{dailyGenre.name}</b>
    </div>
  )
}

export default Genre