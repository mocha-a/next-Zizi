'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { genreIcons } from '@/constants/genreIcons';
import TagBtn from '../../common/TagBtn';

const TrendingTags = () => {
  const router = useRouter();

  const handleClick = (query: string) => {
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className='trendingTags-contanier'>
      <h3>핫한_분위기.zip</h3>

      <ul className='tag-ul'>
        {Object.entries(genreIcons).map(([genre, icon]) => (
          <li key={genre} className='trending-tag'>
            <div onClick={() => handleClick(genre)}>
              <TagBtn tagbtn={`${icon} ${genre}`} className='genreTag'/>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingTags;