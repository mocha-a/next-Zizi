'use client';

import TagBtn from '../common/TagBtn'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css'; // 기본 스타일

function Mood() {
    const tags = [
      '여름',
      '운동',
      '드라이브',
      '스트레스',
      '출퇴근',
      '추억소환',
      '집중할때',
      '비오는날',
    ];

  return (
    <div className="mood-container">
        <h2>Choose Your Mood</h2>
        <Swiper
            spaceBetween={10}
            slidesPerView="auto"
        >
            {tags.map((tagName, i) => (
            <SwiperSlide key={i} style={{ width: 'auto' }}>
                <TagBtn tagbtn={tagName} />
            </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}

export default Mood