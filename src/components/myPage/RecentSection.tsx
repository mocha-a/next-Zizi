import React from 'react'
import TagSwiper from './TagSwiper'
import { TAG_LIST } from '@/constants/metadata'

const RecentSection = () => {
  return (
    <TagSwiper tagList={TAG_LIST} />
  )
}

export default RecentSection