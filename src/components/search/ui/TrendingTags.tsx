'use client'; 
import React from 'react';
import { useRouter } from 'next/navigation';
import { allTags } from '@/constants/chartTags';
import TagBtn from '../../common/TagBtn';

const TrendingTags = () => {
  const mood = allTags.mood.map(item => item.kor);

  const router = useRouter();

  const handleClick = async (query: string) => {
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className='trendingTags-contanier'>
      <h3>핫한_분위기.zip</h3>
      <ul className='tag-ul'>
        {mood.map((item, i)=>
          <li key={i} className='trending-tag'>
            <div onClick={() => handleClick(item)}><TagBtn tagbtn={item}/></div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default TrendingTags