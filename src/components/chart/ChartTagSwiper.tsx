import React from 'react'
import TagBtn from '@/components/common/TagBtn';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

interface TagSwiperProps {
    tabType: 'top' | 'genre' | 'mood';
    tagList: any[];
    selectedTag: string;
    setSelectedTag: (tag: string) => void;
}

function ChartTagSwiper({tabType, tagList, selectedTag, setSelectedTag}: TagSwiperProps) {
  return (
      <div className='chart-tagbtn-box'>
        {selectedTag && (
            <Swiper
                modules={[FreeMode]}
                slidesPerView={'auto'}
                freeMode={true}
            >
                {tabType === 'top' ? (
                    tagList.map((tag: string) => (
                        <SwiperSlide key={tag}>
                            <button onClick={() => {setSelectedTag(tag)}}>
                                <TagBtn tagbtn={tag} className={`chart-tagbtn ${selectedTag === tag ? 'active' : ''}`}/>
                            </button>
                        </SwiperSlide>
                    ))
                ) : (
                    tagList.map((tag: { kor: string, eng: string }) => (
                        <SwiperSlide key={tag.kor}>
                            <button onClick={() => {setSelectedTag(tag.eng)}}>
                                <TagBtn tagbtn={tag.kor} className={`chart-tagbtn ${selectedTag === tag.eng ? 'active' : ''}`}/>
                            </button>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        )}
    </div>
  )
}

export default ChartTagSwiper