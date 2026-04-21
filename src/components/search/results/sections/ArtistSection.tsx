'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SearchArtist } from '@/types/deezer/search';
import ArtistCard from '@/components/entities/artist/ui/ArtistCard';
import SectionHeader from '../../ui/SectionHeader';
import ArtistSkeleton from '@/components/loading/item/ArtistSkeleton';

import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  data: SearchArtist[];
  loading: boolean;
}

const ArtistSection = ({ data, loading }: Props) => {
  return (
    <div className='allReslts allReslts-artist'>
      <SectionHeader title="아티스트" targetIndex={1} type="artist" />

      <Swiper
        slidesPerView={3.35}
        className="mySwiper artist-container"
      >
        {/* 로딩 상태 */}
        {loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <SwiperSlide key={`artist-skeleton-${i}`} style={{ width: '110px' }}>
              <ArtistSkeleton />
            </SwiperSlide>
          ))
        }

        {/* 실제 데이터 */}
        {!loading &&
          data.map((artist) => (
            <SwiperSlide key={artist.id} style={{ width: '110px' }}>
              <Link href={`/artist/${artist.id}`}>
                <ArtistCard
                  name={artist.name}
                  imageUrl={artist.picture_medium}
                  showFans={false}
                />
              </Link>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
};

export default ArtistSection;