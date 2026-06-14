'use client';

import React from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { typeSearch } from '@/lib/api/serach';
import { SearchPlaylist } from '@/types/deezer/search';
import HomeMediaSkeleton from '../loading/item/HomeMediaSkeleton';
import GetDailyGenre from './GetDailyGenre';
import Play from '../icons/Play';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

function Record() {
    // const testdata = [
    //     {
    //         id: 0,
    //         title: '그 시절 여름 기억조작 레트로 시티팝',
    //         imgUrl: 'record0.png',
    //         recordUrl: '',
    //     },
    //     {
    //         id: 1,
    //         title: '오래된 로맨스 영화 속 엔딩 크레딧처럼',
    //         imgUrl: 'record1.png',
    //         recordUrl: '',
    //     },
    //     {
    //         id: 2,
    //         title: '감성을 파고드는 드라마 속 발라드 OST',
    //         imgUrl: 'record2.png',
    //         recordUrl: '',
    //     },
    // ];
    const router = useRouter();
    const { data: session } = useSession();

    const { dailyGenre } = GetDailyGenre();
    const genre = dailyGenre?.name || '';
    
    const { data: playlists, isLoading } = useQuery<SearchPlaylist[]>({
        queryKey: ['playlists', 'playlist', genre],
        queryFn: async () => {
            const response = await typeSearch(genre, 'playlist', 5);
            return response.items; // { items: [...], next: ... } 중 items만 리턴!
        },
        enabled: !!genre, // genre가 존재하고, 빈 문자열이 아닐 때만 true가 됨
    });
    console.log(session)
  return (
    <div className='record-container'>
        <h2>{ session ? `${session.user.name}님_맞춤_레코드.dll` : 'zi존이_맞춤_레코드.dll'}</h2>
        
        <Swiper
            slidesPerView={2.4}
            spaceBetween={10}
            modules={[Pagination]}
            className="mySwiper"
        >
            {(!genre || isLoading) ? (
                Array.from({ length: 6 }).map((_, i) => (
                <SwiperSlide key={i}>
                    <HomeMediaSkeleton />
                </SwiperSlide>
                ))
            ) : (     
                playlists?.slice(0,3).map((item: SearchPlaylist) => (
                    <SwiperSlide 
                        key={item.id}
                        onClick={() => router.push(`/playlist/${item.id}`)}>
                        <div className="record-img">
                            <Image
                                src={item?.picture_medium}
                                alt={`레코드 이미지 ${item.id}`}
                                width={150}
                                height={150}
                            />
                            <span>♬ {item.tracklist.length}</span>
                            <Play />
                        </div>
                        <div className='record-info'>
                            <p className="record-title">{item.title}</p>
                            <span>{item.user.name}</span>
                        </div>
                    </SwiperSlide>
                ))
            )}
        </Swiper>
    </div>
  )
}

export default Record