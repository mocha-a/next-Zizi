import React from 'react'
import TagSwiper from './TagSwiper';

const tagList = [
  { id: 'tracks', name: '곡' },
  { id: 'artists', name: '아티스트' },
  { id: 'albums', name: '앨범' },
  { id: 'playlists', name: '플레이리스트' },
];

const LikedSection = () => {
  return (
    <TagSwiper tagList={tagList} />
  )
}

export default LikedSection