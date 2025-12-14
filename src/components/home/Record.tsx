'use client';

import React from 'react'
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Play from '../icons/Play';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

function Record() {
    const data = [
        {
            id: 0,
            title: '그 시절 여름 기억조작 레트로 시티팝',
            imgUrl: 'record0.png',
            recordUrl: '',
        },
        {
            id: 1,
            title: '오래된 로맨스 영화 속 엔딩 크레딧처럼',
            imgUrl: 'record1.png',
            recordUrl: '',
        },
        {
            id: 2,
            title: '감성을 파고드는 드라마 속 발라드 OST',
            imgUrl: 'record2.png',
            recordUrl: '',
        },
    ]
  return (
    <div className='record-container'>
        {/* <h2>{ session ? `${session.user.name}님_맞춤_레코드.dll` : '맞춤_레코드.dll'}</h2> */}
        <h2>OO님_맞춤_레코드.dll</h2>
        <Swiper
            slidesPerView={2.4}
            spaceBetween={10}
            modules={[Pagination]}
            className="mySwiper"
        >
            {data.map((item) => (
                <SwiperSlide key={item.id}>
                <div className="record-img">
                    <Image
                        src={`/imgs/${item?.imgUrl}`}
                        alt={`레코드 이미지 ${item.id}`}
                        width={150}
                        height={150}
                    />
                    <Play />
                </div>
                <p className="record-title">{item.title}</p>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}

export default Record