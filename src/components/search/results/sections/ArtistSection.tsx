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
import EmptyState from '@/components/common/EmptyState';

interface Props {
  data: SearchArtist[];
  loading: boolean;
  query: string
}

const ArtistSection = ({ data, loading, query }: Props) => {
  return (
    <div className='allReslts allReslts-artist'>
      <SectionHeader title="아티스트" type="artist" />

      {/* 로딩 상태 */}
      {loading ? (
        <Swiper slidesPerView={3.35} className="mySwiper artist-container">
          {Array.from({ length: 5 }).map((_, i) => (
            <SwiperSlide key={i}>
              <ArtistSkeleton showSubText={false}/>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : data.length > 0 ? ( 
        <Swiper slidesPerView={3.35} className="mySwiper artist-container">
          {data.map((artist) => (
            <SwiperSlide key={artist.id}>
              <Link href={`/artist/${artist.id}`}>
                <ArtistCard
                  name={artist.name}
                  imageUrl={artist.picture_medium}
                  showFans={false}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <EmptyState
          title="🎤"
          keyword={query}
          description={`와 \n 일치하는 아티스트가 없어 இᯅஇ`}
          className='search-results'
        />
      )}
    </div>
  );
};

export default ArtistSection;


