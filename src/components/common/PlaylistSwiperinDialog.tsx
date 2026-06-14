import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { MyPlaylist } from '@/types/user/myPlaylist';
import ThumbnailGrid from "../myPage/myplaylist/ThumbnailGrid";

// Swiper 스타일 CSS 필수 임포트
import 'swiper/css';
import 'swiper/css/pagination';

interface PlaylistSwiperProps {
  myListItem?: MyPlaylist[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function PlaylistSwiplerinDialog({ myListItem, selectedId, onSelect }: PlaylistSwiperProps) {
  // 1. API 데이터를 원하는 개수(예: 4개)씩 쪼개는 함수
  const chunkArray = (array: Array<MyPlaylist> | undefined, chunkSize: number) => {
    const result: Array<Array<MyPlaylist>> = [];
    if (!array) return result;

    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result; // [[1,2,3], [4,5,6], [7,8,9]] 형태가 됨
  };

  // 한 페이지에 보일 데이터 개수 설정
  const ITEMS_PER_PAGE = 3;
  const pages = chunkArray(myListItem, ITEMS_PER_PAGE);

  return (
    <div className="swiper-container" style={{ width: '100%' }}>
        <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
        >
            {pages.map((pageItem, pageIdx) => (
                <SwiperSlide key={pageIdx}>
                    <div className='page-wrapper' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {pageItem?.map((item) => (
                            <button key={item.id} className={`${item.id === selectedId ? 'selected': ''} playlist-item-in-dialog`}
                                    onClick={() => onSelect(item.id)}
                            >
                                <ThumbnailGrid thumbnails={item.thumbnails} className="playlist-thumb-in-dialog"/>
                                <span className="playlist-title-in-dialog">{item.title}</span>
                            </button>
                        ))}

                        {pageItem?.length < 3 && 
                            Array.from({ length: 3 - pageItem?.length }).map((_, i) => (
                                <div key={`empty-${i}`} className="playlist-item-in-dialog empty-slot" style={{ visibility: 'hidden', height: '최고 높이값' }}></div>
                        ))}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  );
}