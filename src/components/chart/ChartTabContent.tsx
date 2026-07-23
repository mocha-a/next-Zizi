"use client";

import React, { useEffect, useMemo, useState } from 'react'
// import { allTags } from '@/constants/chartTags';
import TrackItem from '@/components/common/TrackItem';
import ChartTagSwiper from './ChartTagSwiper';
import { useQuery } from '@tanstack/react-query';
import { Track } from '@/types/deezer/deezer';
import { getChart } from '@/lib/api/chart';
import { getAllGenre } from '@/lib/api/genre';
import TrackSkeleton from '../loading/item/TrackSkeleton';
import { useInfiniteList } from '@/hooks/useInfiniteList';
import InfiniteScroll from '../common/InfiniteScroll';

interface ChartTabContentProps {
  tabType: 'top' | 'genre';
}

function ChartTabContent({ tabType }: ChartTabContentProps) {

  // 1. 장르 목록 가져오기 (API 호출)
  const { data: genreList, isLoading: isGenreLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: getAllGenre,
    enabled: tabType === 'genre', // 장르 탭일 때만 호출해서 효율성 높임
    staleTime: 1000 * 60 * 60, // 장르는 자주 안 바뀌니까 1시간 캐싱
  });

  // 2. 태그 값에 따른 데이터 필터링
  const [selectedTag, setSelectedTag] = useState<string>('');

  // 🔥 장르 로딩 완료 시 첫 번째 장르 ID로 자동으로 태그 설정
  useEffect(() => {
    if (tabType === 'genre' && genreList && genreList.length > 0) {
      // genreList의 첫 번째 아이템 id로 설정 (없으면 '0')
      setSelectedTag(String(genreList[0].id));      
    }
  }, [genreList, tabType]);

  // 3. 차트 데이터 가져오기 (API 호출)
  // const { data: chartData, isLoading, error } = useQuery<Track[], Error>({
  //   queryKey: ['chart', selectedTag],
  //   queryFn: () => {
  //     // 탭 타입에 따라 다른 API 호출
  //     if (tabType === 'top') return getChart.getGlobalTracks();
  //     return getChart.getGenreTracks(selectedTag);
  //   },
  //   staleTime: 1000 * 60 * 30,
  // });

  // chartdata infinity 컨텐츠로 수정
  const {
    list: rawChartData,
    isLoading,
    loadMore,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteList<Track>({
    queryKey: ['chart', tabType, selectedTag],
    queryFn: async (pageParam = 0) => {
      if (tabType === 'genre' && !selectedTag) {
        return { items: [] };
      }

      const targetGenre = selectedTag;

      // 탭 타입에 따라 api 호출 및 { items: [...] } 형태로 전달
      const tracks = tabType === 'top'
        ? await getChart.getGlobalTracks({ pageParam })
        : await getChart.getGenreTracks({ genreId: targetGenre, pageParam });
        
      return { 
        items: tracks || [] 
      };
    },
    
    limit: 45, 
  });

  // 중복 방지 및 개수 제한
  const chartData = useMemo(() => {
    return Array.from(
      new Map(rawChartData.map(track => [track.id, track])).values()
    ).slice(0, 100);
  }, [rawChartData]);

  // if (error) return <div>데이터 로딩 실패</div>;
  // selectedTag가 바뀔 때마다 데이터 fetch
    // useEffect(() => {
    //     if (!selectedTag) return; // 초기화 시 빈 값 방지

    //     fetch(`/api/lastfm/lastfm?tag=${selectedTag}`)
    //     .then(res => {
    //         if (!res.ok) throw new Error('Failed to fetch tracks');
    //         return res.json();
    //     })
    //     .then(data => setTopTracks(data))
    //     .catch(err => console.error(err));
    // }, [selectedTag]);
  
  return (
    <>
      {tabType === 'genre' && (
        // <ChartTagSwiper tagList={allTags.genre} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
        <ChartTagSwiper tagList={genreList} selectedTag={String(selectedTag)} setSelectedTag={(id) => setSelectedTag(String(id))}/>
      )}

      {/* <div className='chart-topmenu-box'>
        <IconButton
          icon={<Check className="chart-icon-check"/>}
          text="전체선택"
        />
        <IconButton
          icon={<PlayBorder className='chart-icon-play'/>}
          text="전체듣기"
        />
      </div> */}

      <InfiniteScroll
        loadMore={loadMore}
        loading={isFetchingNextPage}
        hasMore={hasNextPage && chartData.length < 100} // 100개 이상이면 false > 스크롤 감지 중단
      >
        <ul className='tracklist'>
          {/* 1. 완전 처음 데이터를 불러오는 중일 때 */}
          {(isGenreLoading || isLoading || (tabType === 'genre' && !selectedTag)) ? (
            Array.from({ length: 20 }).map((_, i) => (
                <TrackSkeleton key={i} index={i} page="chart" />
              ))
          ) : (
            <>
              {/* 2. 기존 불러온 트랙 데이터 목록 렌더링 */}
              {chartData?.map((track: Track, i: number) => (
                <TrackItem
                  key={track.id ? `${track.id}-${i}` : i} // 중복 키 방지
                  track={track}
                  index={i}
                  page="chart"
                />
              ))}

              {/* 3. 스크롤 내려서 다음 페이지를 불러오는 중일 때 */}
              {isFetchingNextPage && (
                Array.from({ length: 5 }).map((_, i) => (
                  <TrackSkeleton key={`more-${i}`} index={chartData.length + i} page="chart" />
                ))
              )}
            </>
          )}
        </ul>
      </InfiniteScroll>
    </>
  )
}

export default ChartTabContent