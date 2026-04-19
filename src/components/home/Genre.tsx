'use client';

import 'swiper/css'; // 기본 스타일
import GetDailyGenre from './GetDailyGenre';

function Genre() {
  const { dailyGenre } = GetDailyGenre(); // 오늘의 무드를 결정하는 함수 불러오기
  
  return (
    <div className="mood-container">
      <span>today is...</span>

      {dailyGenre ? (
        <>
          <span>{dailyGenre.icon}</span>
          <b>{dailyGenre.name}</b>
        </>
      ) : (
        <>
          <span>🎧</span>
          <b>loading</b>
        </>
      )}
    </div>
  )
}

export default Genre