'use client'

import React from 'react';
import Link from 'next/link';
import { useSearchStore } from '@/store/searchStore';
import { MapTrack } from '@/types/trackMapper';
import TrackItem from '@/components/common/TrackItem';
import SectionHeader from '../ui/SectionHeader';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import ArtistCard from '@/components/entities/artist/ui/ArtistCard';
import AlbumCard from '@/components/entities/album/ui/AlbumCard';
import PlaylistCard from '@/components/entities/playlist/ui/PlaylistCard';

const AllResults = () => {
  const { allResults } = useSearchStore();

  return (
    <div className='allReslts-container'>
      <div className='allReslts allReslts-artist'>
        <SectionHeader title="아티스트" targetIndex={1} type="artist"/>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={ 10 }
          className="mySwiper artist-container"
        >
        {allResults?.artists?.items.map((artist) => (
          <SwiperSlide key={artist.id} style={{ width: '110px' }}>
            <Link href={`/search/artist/${artist.id}`}>
              <ArtistCard name={artist.name} imageUrl={artist.images[0]?.url} />
            </Link>
          </SwiperSlide>
        ))}
        </Swiper>
      </div>

      <div className='allReslts allReslts-track tracklist'>
        <SectionHeader title="곡" targetIndex={2} type="album"/>
        {allResults?.tracks?.items.map((track)=>
          <TrackItem
            key={track.id}
            trackData={MapTrack(track)}
            index={0}
            page=""
          />
        )}
      </div>

      <div className='allReslts allReslts-album'>
        <SectionHeader title="앨범" targetIndex={3} type="track"/>
        {allResults?.albums?.items.map((album) => (
          <AlbumCard
            key={album.id}
            id={album.id}
            name={album.name}
            images={album.images}
            release_date={album.release_date}
            album_type={album.album_type}
            artists={album.artists}
          />
        ))}
      </div>

      <div className='allReslts allReslts-playlist'>
        <SectionHeader title="플레이리스트" targetIndex={4} type="playlist"/>
        {allResults?.playlists?.items.map((playlist)=>
          <PlaylistCard
            key={playlist.id}
            id={playlist.id}
            images={playlist.images}
            name={playlist.name}
            owner={playlist.owner}
            tracks={playlist.tracks}
          />
        )}
      </div>
    </div>
  );
};

export default AllResults;
