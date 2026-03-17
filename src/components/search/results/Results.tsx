'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { allSearch } from '@/lib/search';
import { useSearchStore } from '@/store/searchStore';

import SectionHeader from '../ui/SectionHeader';
import TrackItem from '@/components/common/TrackItem';
import ArtistCard from '@/components/entities/artist/ui/ArtistCard';
import AlbumCard from '@/components/entities/album/ui/AlbumCard';
import PlaylistCard from '@/components/entities/playlist/ui/PlaylistCard';

import { AllResults } from '@/types/deezer/search';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const Results = () => {
  const { searchQuery } = useSearchStore();
  const [ loading, setLoading ] = useState(false);
  const [ allData, setAllData ] = useState<AllResults | null>(null);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchAll = async () => {
      setLoading(true);
      const data = await allSearch(searchQuery);
      setAllData(data);

      setLoading(false);
    };

    fetchAll();
  }, [searchQuery]);
  console.log(allData);
  if (loading) return <div>로딩중...</div>;

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
              <ArtistCard name={artist.name} imageUrl={artist.picture_medium} />
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
            trackData={track}
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
