'use client';

import Image from "next/image";
// import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import Play from "../icons/Play";
import { Album } from "@/types/deezer/deezer";
import { useQuery } from "@tanstack/react-query";
import { getNewRelease } from "@/lib/api/new";

// type Album = {
//   id: string;
//   name: string;
//   images: {
//     url: string;
//   }[];
//   artists: {
//     name: string;
//   }[];
// };

interface newType {
  data: Album[];
}

function NewRelease() {

  const { data: newRelease, isLoading, error } = useQuery<newType, Error>({
    queryKey: ['newRelease'],
    queryFn: () => getNewRelease(),
    staleTime: 1000 * 60 * 30,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>데이터 로딩 실패</div>;

  // const [data, setData] = useState<Album[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   setLoading(true);
  //   setError(null);

  //   fetch('/api/spotify/spotify-new-releases')
  //     .then(res => {
  //       if (!res.ok) throw new Error('Failed to fetch new releases');
  //       return res.json();
  //     })
  //     .then(data => {
  //       // Spotify API의 데이터 구조에 맞게 파싱
  //       // data.albums.items 가 앨범 배열임
  //       setData(data.albums.items);
  //     })
  //     .catch(err => setError(err.message))
  //     .finally(() => setLoading(false));
  // }, []);

  // if (loading) return <p>로딩 중...</p>;
  // if (error) return <p>에러: {error}</p>;

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
        {newRelease?.data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="album-img">
              <Image
                src={item.cover_medium}
                alt={item.title}
                width={150}
                height={150}
              />
              <Play />
            </div>
            <p className="album-name">{item.title}</p>
            <p className="artists-name">{item.artist.name}</p>
          </SwiperSlide>
        ))}
        </Swiper>
    </div>
  )
}

export default NewRelease