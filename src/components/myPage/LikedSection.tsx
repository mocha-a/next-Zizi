import React from 'react'
import TagSwiper from './TagSwiper';
import { TAG_LIST } from '@/constants/metadata';

const LikedSection = () => {
  return (
    <TagSwiper tagList={TAG_LIST} />
  )
}

export default LikedSection