'use client'; 
import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getPopularSearch } from '@/lib/api/serach';
import { PopularSearch } from '@/types/deezer/search';
import TrendingSkeleton from '@/components/loading/item/TrendingSkeleton';


const TrendingSearches = () => {
  const router = useRouter();

  const { data: top = [], isLoading } = useQuery<PopularSearch[]>({
    queryKey: ['popular-search'],
    queryFn: getPopularSearch,
    staleTime: 1000 * 60 * 5, // 5분 캐싱 (추천)
  });

  const handleClick = (query: string) => {
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className='trendingSearches-contanier'>
      <h3>인기 검색어 top 10.exe</h3>
      <ul>
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <TrendingSkeleton key={i} i={i} />
            ))
          : top?.map((item, i) => (
              <li key={i} className="trending">
                <b className="num">{i + 1}</b>
                <button
                  className="keyword"
                  onClick={() => handleClick(item.keyword)}
                >
                  {item.keyword}
                </button>
              </li>
            ))}
      </ul>
    </div>
  )
}

export default TrendingSearches