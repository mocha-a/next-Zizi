import React, { useEffect, useState } from 'react';
import { useSearchStore, Artist, Track, Album, Playlist } from '@/store/searchStore';
import SectionHeader from './SectionHeader';
import Image from 'next/image';

const AllResults = () => {
  const { results } = useSearchStore();
  const [ artists, setArtists ] = useState<Artist[]>([]);
  const [ tracks, setTracks ] = useState<Track[]>([]);
  const [ albums, setAlbums ] = useState<Album[]>([]);
  const [ playlists, setPlaylists ] = useState<Playlist[]>([]);

  useEffect(() => {
    setArtists(results?.artists?.items || []);
    setTracks(results?.tracks?.items || []);
    setAlbums(results?.albums?.items || []);
    setPlaylists(results?.playlists?.items || []);
  }, [results]);

  console.log(albums);
  console.log(tracks);
  console.log(playlists);

  return (
  <div className='allReslts-container'>
    <div className='allReslts allReslts-artist'>
      <SectionHeader title="아티스트" />
      <div className='artist-container'>
        { artists.map((artist)=>
          <div key={artist.id} className='artist-container'>
            <div className='artist-image'>
              <Image
                src={artist?.images[0]?.url}
                alt="artist"
                width={98}
                height={98}
              />
            </div>
            <p className='artist-name'>{artist.name}</p>
          </div>
        )}
      </div>
    </div>
    <div className='allReslts allReslts-track'>
      <SectionHeader title="곡" />
    </div>
    <div className='allReslts allReslts-album'>
      <SectionHeader title="앨범" />
      { albums.map((album)=>
        <div key={album.id}>
          <div className='album-top'>
            <div className='album-image'>
              <Image
                src={album?.images[0]?.url}
                alt="album"
                width={90}
                height={90}
              />
            </div>
            <p className='album-name'>{album.name}</p>
            {album.artists.map((albumA)=>
              <p key={albumA.id} className='albumA-name'>
                {albumA.name}
              </p>
            )}
          </div>
          <div className='album-bottom'>
            <p>{album.release_date}</p>
          </div>
        </div>
      )}
    </div>
    <div className='allReslts allReslts-playlist'>
      <SectionHeader title="플레이리스트" />
    </div>
  </div>
  )
}

export default AllResults