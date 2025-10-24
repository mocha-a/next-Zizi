import React from 'react'
import Image from 'next/image'
import TrendingSearches from '@/components/search/TrendingSearches'
import TrendingTags from '@/components/search/TrendingTags'

import '../../styles/search/search.scss'

function page() {
  return (
    <div className='search-container'>
      <div className='title'>검색</div>
      <form id="search" className='search-bar'>
        <input type="search" name="search" placeholder="🎧 요즘 꽂힌 노래 있어 ?"/>
        <button type='submit'>
          <p>
            <Image
            src='/icons/search-btn.svg'
            alt='searchBtn'
            width={21}
            height={21}
            />
          </p>
          </button>
      </form>
      <TrendingSearches/>
      <TrendingTags/>
    </div>
  )
}

export default page