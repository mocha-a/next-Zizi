'use client'

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { allSearch } from '@/lib/api/serach';
import { AllResults } from '@/types/deezer/search';

import TrackItem from '@/components/common/TrackItem';
import ArtistCard from '@/components/entities/artist/ui/ArtistCard';
import AlbumCard from '@/components/entities/album/ui/AlbumCard';
import PlaylistCard from '@/components/entities/playlist/ui/PlaylistCard';
import SectionHeader from '../ui/SectionHeader';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const Results = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') ?? '';

  const { data: allData, isLoading, error } = useQuery<AllResults, Error>({
    queryKey: ['allSearch', query],
    queryFn: () => allSearch(query!),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  });

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
            <Link href={`/artist/${artist.id}`}>
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
          <Link key={album.id} href={`/album/${album.id}`}>
            <AlbumCard
              id={album.id}
              title={album.title}
              cover={album.cover_medium}
              record_type={album.record_type}
              artist={album.artist}
            />
          </Link>
        ))}
      </div>

      <div className='allReslts allReslts-playlist'>
        <SectionHeader title="플레이리스트" targetIndex={4} type="playlist"/>
        {allData?.playlists?.map((playlist)=>
          <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
            <PlaylistCard
              id={playlist.id}
              picture={playlist.picture_medium}
              title={playlist.title}
              user={playlist.user.name}
              tracks={playlist.nb_tracks}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Results;
