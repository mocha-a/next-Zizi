'use client'

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSearchStore } from '@/store/searchStore';
import { useQuery } from '@tanstack/react-query';
import TrackItem from '@/components/common/TrackItem';
import ArtistCard from '@/components/entities/artist/ui/ArtistCard';
import AlbumCard from '@/components/entities/album/ui/AlbumCard';
import PlaylistCard from '@/components/entities/playlist/ui/PlaylistCard';
import SectionHeader from '../ui/SectionHeader';
import { AllResults } from '@/types/deezer/search';
import { allSearch } from '@/lib/api/serach';

import 'swiper/css';
import 'swiper/css/pagination';

const Results = () => {
  const { searchQuery } = useSearchStore();

  const { data: allData, isLoading, error } = useQuery<AllResults, Error>({
    queryKey: ['allSearch', searchQuery],
    queryFn: () => allSearch(searchQuery!),
    enabled: !!searchQuery,
    staleTime: 1000 * 60 * 5,
  });

  console.log(allData);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>검색 중 오류 발생</div>;

  return (
    <div className='allReslts-container'>
      <div className='allReslts allReslts-artist'>
        <SectionHeader title="아티스트" targetIndex={1} type="artist"/>
        <Swiper
          slidesPerView={3.35}
          className="mySwiper artist-container"
        >
        {allData?.artists?.map((artist) => (
          <SwiperSlide key={artist.id} style={{ width: '110px' }}>
            <Link href={`/search/artist/${artist.name}`}>
              <ArtistCard name={artist.name} imageUrl={artist.picture_medium} showFans={false}/>
            </Link>
          </SwiperSlide>
        ))}
        </Swiper>
      </div>

      <div className='allReslts allReslts-track tracklist'>
        <SectionHeader title="곡" targetIndex={2} type="track"/>
        {allData?.tracks?.map((track)=>
          <TrackItem
            key={track.id}
            track={track}
            index={0}
            page=""
          />
        )}
      </div>

      <div className='allReslts allReslts-album'>
        <SectionHeader title="앨범" targetIndex={3} type="album"/>
        {allData?.albums?.map((album) => (
          <AlbumCard
            key={album.id}
            id={album.id}
            title={album.title}
            cover={album.cover_medium}
            record_type={album.record_type}
            artist={album.artist}
          />
        ))}
      </div>

      <div className='allReslts allReslts-playlist'>
        <SectionHeader title="플레이리스트" targetIndex={4} type="playlist"/>
        {allData?.playlists?.map((playlist)=>
          <PlaylistCard
            key={playlist.id}
            id={playlist.id}
            picture={playlist.picture_medium}
            title={playlist.title}
            user={playlist.user.name}
            tracks={playlist.nb_tracks}
          />
        )}
      </div>
    </div>
  );
};

export default Results;
