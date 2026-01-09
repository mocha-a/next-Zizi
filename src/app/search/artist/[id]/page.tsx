"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import TabsContainer from '@/components/common/TabsContainer';

import { useTabStore } from '@/store/tabStore';
import { useSearchStore } from '@/store/searchStore';
import { artistById } from '@/lib/search';
import { Artist } from '@/types/spotify';
import DetailHeader from '@/components/common/DetailHeader';

import ArtistAlbums from '@/components/entities/artist/container/ArtistAlbums';

// 탭 메뉴
const tabs = [
  { label: '곡', content: <ArtistAlbums /> },
  { label: '앨범', content: <ArtistAlbums /> },
];

const Page = () => {
  /**
   * URL에서 아티스트 id 추출
   */
  const { id } = useParams<{ id: string }>();

  /**
   * 검색 결과 캐시(store)에서
   * 동일한 id의 아티스트가 있는지 먼저 확인
   *
   * - 검색 → 상세 진입: 값 있음
   * - 직접 URL 접근 / 새로고침: undefined
   */
  const { getEntityById } = useSearchStore();
  const cachedArtist = getEntityById('artist', id);

  /**
   * 상세 페이지에서 실제로 사용할 아티스트 상태
   *
   * 1. 검색 결과에 이미 있으면 → 그 데이터 사용
   * 2. 없으면 → API로 단건 fetch 후 로컬 state에 저장
   */
  const [artist, setArtist] = useState<Artist | null>(
    cachedArtist ?? null
  );

  /**
   * 로딩 상태
   * - 캐시가 있으면 false
   * - 캐시가 없으면 true (fetch 필요)
   */
  const [loading, setLoading] = useState(!cachedArtist);

  /**
   * 탭 상태 (곡 / 앨범)
   * - 전역 UI 상태이므로 zustand 사용
   */
  const { tabValue, setTabValue } = useTabStore();

  /**
   * fallback fetch 로직
   *
   * - store에 캐시가 있으면 API 호출 안 함
   * - 캐시가 없을 때만 id 기준 단건 조회
   * - 가져온 데이터는 페이지 로컬 state에만 저장
   */
  useEffect(() => {
    if (cachedArtist) return;

    const fetch = async () => {
      setLoading(true);
      const data = await artistById(id);
      setArtist(data);
      setLoading(false);
    };

    fetch();
  }, [id, cachedArtist]);

  /**
   * 렌더링 분기
   */
  if (loading) return <div>로딩중...</div>;
  if (!artist) return <div>아티스트 없음</div>;

  /**
   * 정상 렌더링
   */
  return (
    <div className="artist-Detail">
      <DetailHeader />
      {/* 상단: 아티스트 기본 정보 */}
      <div className="artist-top">
        <p>
          <Image
            src={artist.images?.[0]?.url ?? '/imgs/default-artist.png'}
            alt={artist.name}
            width={390}
            height={360}
          />
        </p>

        <div>{artist.name}</div>
        <div>{artist.genres?.join(', ')}</div>
        <div>
          팔로워 {artist.followers?.total.toLocaleString()}
        </div>
      </div>

      {/* 하단: 곡 / 앨범 탭 */}
      <div className="artist-down">
        <TabsContainer
          tabs={tabs}
          tabValue={tabValue}
          setTabValue={setTabValue}
          fullWidth
          width
        />
      </div>
    </div>
  );
};

export default Page;
