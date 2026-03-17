'use client'; 

import React from 'react';
import { useRouter } from 'next/navigation';
import { doSearch } from '@/lib/search';

const TrendingSearches = () => {
  const top = [
    "케이팝 데몬 헌티스 OST",
    "여름이었다",
    "에스파",
    "싸이",
    "데이식스",
    "시작의 아이",
    "아이유",
    "케이팝 데몬 헌티스 OST",
    "여름이었다",
    "에스파"
  ]

  const router = useRouter();

  const handleClick = async (query: string) => {
    await doSearch(query, router);
  };

  return (
    <div className='trendingSearches-contanier'>
      <h3>인기 검색어 top 10.exe</h3>
      <ul>
        {top.map((item, i) => (
          <li key={i} className="trending">
            <b className="num">{i + 1}</b>
            <button
              className="keyword"
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TrendingSearches