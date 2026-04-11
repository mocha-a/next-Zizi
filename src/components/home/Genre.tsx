'use client';

import 'swiper/css'; // 기본 스타일
import GetDailyGenre from './GetDailyGenre';

function Genre() {
  const genreOfToday = GetDailyGenre(); // 오늘의 무드를 결정하는 함수 불러오기

  if (!genreOfToday) return null; // 값이 없으면 null return
  
  return (
    <div className="mood-container">
      <span>today is...</span>
      {/* <span>{genreOfToday.icon}</span> */}
      <b>{genreOfToday.name}</b>
    </div>
  )
}

export default Genre