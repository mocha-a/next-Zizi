import React from 'react'

import { TAG_LIST } from '@/constants/metadata';
import TagSwiper from './recent/TagSwiper';

const LikedSection = () => {
  return (
    <TagSwiper tagList={TAG_LIST} />
  )
}

export default LikedSection