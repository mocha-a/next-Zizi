'use client'

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { allSearch } from '@/lib/api/serach';
import { AllResults } from '@/types/deezer/search';
import { ArtistSection, TrackSection, AlbumSection, PlaylistSection } from './sections';

const Results = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') ?? '';

  const { data: allData, isLoading, error } = useQuery<AllResults, Error>({
    queryKey: ['allSearch', query],
    queryFn: () => allSearch(query!),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  });

  if (error) return <div>검색 중 오류 발생</div>;

  return (
    <div className='allReslts-container'>
      <ArtistSection data={allData?.artists ?? []} loading={isLoading} />
      <TrackSection data={allData?.tracks ?? []} loading={isLoading} />
      <AlbumSection data={allData?.albums ?? []} loading={isLoading} />
      <PlaylistSection data={allData?.playlists ?? []} loading={isLoading} />
    </div>
  );
};

export default Results;
