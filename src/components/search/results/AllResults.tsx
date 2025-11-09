import React, { useEffect, useState } from 'react';
import { useSearchStore } from '@/store/searchStore';
import { Artist, Album, Track, Playlist } from '@/types/spotify';
import { MapTrack } from '@/types/trackMapper';
import Link from 'next/link';
import SectionHeader from './SectionHeader';
import ArtistCard from '../card/ArtistCard';
import AlbumCard from '../card/AlbumCard';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import TrackItem from '@/components/common/TrackItem';
import Image from 'next/image';

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

  console.log(playlists);

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

      <div className='allReslts allReslts-track tracklist'>
        <SectionHeader title="곡" targetIndex={2}/>
        {tracks.map((track)=>
          <TrackItem
            key={track.id}
            trackData={MapTrack(track)}
            index={0}
            page=""
          />
        )}
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
        {playlists.map((playlist, i)=>
          <div key={i} className='playlist-box'>
            <div className='playlist-image'>
              {playlist?.images[0]?.url && (
                <Image
                  src={playlist.images[0].url}
                  alt={`${playlist.name} cover`}
                  width={90}
                  height={90}
                />
              )}
            </div>
            <div className='playlist-detail'>
              <p>{playlist?.name}</p>
              <p>{`총 ${playlist?.tracks.total} 곡`}</p>
              <p>{playlist?.owner.display_name}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllResults;
