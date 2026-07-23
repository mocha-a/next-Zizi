'use client';

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Album } from "@/types/deezer/deezer";
import { getNewRelease } from "@/lib/api/new";
import HomeMediaSkeleton from "../loading/item/HomeMediaSkeleton";
import Play from "../icons/Play";

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';


interface newType {
  data: Album[];
}

function NewRelease() {
  const router = useRouter();

  const { data: newRelease, isLoading, error } = useQuery<newType, Error>({
    queryKey: ['newRelease'],
    queryFn: () => getNewRelease(),
    staleTime: 1000 * 60 * 30,
  });
console.log(newRelease)
  if (error) return <div>데이터 로딩 실패</div>;

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
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <SwiperSlide key={i}>
              <HomeMediaSkeleton />
            </SwiperSlide>
          ))
        ) : (
          newRelease?.data.slice(0, 10).map((item) => (
            <SwiperSlide
              key={item.id}
              onClick={() => router.push(`/album/${item.id}`)}
            >
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
          ))
        )}
      </Swiper>
    </div>
  );
}

export default NewRelease