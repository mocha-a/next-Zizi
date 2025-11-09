import React, { useEffect, useState } from 'react';
import { useSearchStore } from '@/store/searchStore';
import { Artist, Album, Track, Playlist } from '@/types/spotify';
import Link from 'next/link';
import SectionHeader from './SectionHeader';
import ArtistCard from '../card/ArtistCard';
import AlbumCard from '../card/AlbumCard';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const AllResults = () => {
  const { allResults } = useSearchStore();
  const [ artists, setArtists ] = useState<Artist[]>([]);
  const [ tracks, setTracks ] = useState<Track[]>([]);
  const [ albums, setAlbums ] = useState<Album[]>([]);
  const [ playlists, setPlaylists ] = useState<Playlist[]>([]);

  useEffect(() => {
    setArtists(allResults?.artists?.items || []);
    setTracks(allResults?.tracks?.items || []);
    setAlbums(allResults?.albums?.items || []);
    setPlaylists(allResults?.playlists?.items || []);
  }, [allResults]);

  return (
    <div className='allReslts-container'>
      <div className='allReslts allReslts-artist'>
        <SectionHeader title="아티스트" targetIndex={1}/>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={ 10 }
          className="mySwiper artist-container"
        >
        {artists.map((artist) => (
          <SwiperSlide key={artist.id} style={{ width: '110px' }}>
            <Link href={`/`}>
              <ArtistCard name={artist.name} imageUrl={artist.images[0]?.url} />
            </Link>
          </SwiperSlide>
        ))}
        </Swiper>
      </div>

      <div className='allReslts allReslts-track'>
        <SectionHeader title="곡" targetIndex={2}/>
      </div>

      <div className='allReslts allReslts-album'>
        <SectionHeader title="앨범" targetIndex={3}/>
        {albums.map((album) => (
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
        <SectionHeader title="플레이리스트" targetIndex={4}/>
      </div>
    </div>
  );
};

export default AllResults;
