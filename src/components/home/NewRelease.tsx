'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import Play from "../icons/Play";

type Album = {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
  artists: {
    name: string;
  }[];
};

function NewRelease() {
  const [data, setData] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('/api/spotify/spotify-new-releases')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch new releases');
        return res.json();
      })
      .then(data => {
        // Spotify API의 데이터 구조에 맞게 파싱
        // data.albums.items 가 앨범 배열임
        setData(data.albums.items);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error}</p>;

  return (
    <div className='NewRelease-container'>
        <h2>갓구운_노래.mp3</h2>
        <Swiper
            slidesPerView={2.4}
            grid={{
            rows: 2,
            fill: 'row'
            }}
            spaceBetween={10}
            modules={[Grid, Pagination]}
            className="mySwiper"
        >
        {data.map((item) => (
            <SwiperSlide key={item.id}>
            {/* <div className="album-img">
                <Image
                    src={item.images[0]?.url}
                    alt={item.name}
                    width={150}
                    height={150}
                />
                <Play />
            </div> */}
            <p className="album-name">{item.name}</p>
            <p className="artists-name">{item.artists[0]?.name}</p>
            </SwiperSlide>
        ))}
        </Swiper>
    </div>
  )
}

export default NewRelease