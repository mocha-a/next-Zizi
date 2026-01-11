"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTabStore } from '@/store/tabStore';
import { useSearchStore } from '@/store/searchStore';
import { artistById } from '@/lib/search';
import TabsContainer from '@/components/common/TabsContainer';
import DetailHeader from '@/components/common/DetailHeader';
import ArtistAlbums from '@/components/entities/artist/container/ArtistAlbums';
import { mapGenres, Artist, Album } from '@/types/spotify';

import '../../../../styles/artist/artist.scss';
import Image from 'next/image';
import axios from 'axios';

// 탭 메뉴
const tabs = [
  { label: '곡', content: <ArtistAlbums /> },
  { label: '앨범', content: <ArtistAlbums /> },
];

const Page = () => {
  /**
   * URL에서 아티스트 id 추출
   */
  const params = useParams<{ id: string }>();
  const id = params?.id ?? null;

  /**
   * 검색 결과 캐시(store)에서
   * 동일한 id의 아티스트가 있는지 먼저 확인
   *
   * - 검색 → 상세 진입: 값 있음
   * - 직접 URL 접근 / 새로고침: undefined
   */
  const { getEntityById } = useSearchStore();
  const cachedArtist = id
    ? getEntityById('artist', id)
    : undefined;

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
  const [ trackCount, setTrackCount ] = useState<number | null>(null);
  const [ albumData, setAlbumData ] = useState<Album[] | null>(null);
  const [ loadingTracks, setLoadingTracks ] = useState(false);

  /**
   * fallback fetch 로직
   *
   * - store에 캐시가 있으면 API 호출 안 함
   * - 캐시가 없을 때만 id 기준 단건 조회
   * - 가져온 데이터는 페이지 로컬 state에만 저장
   */
  useEffect(() => {
    if (!id || cachedArtist) return;

    const fetch = async () => {
      setLoading(true);
      const data = await artistById(id);
      setArtist(data);
      setLoading(false);
    };

    fetch();
  }, [id, cachedArtist]);

  // 발매곡 수만 가져오기
  useEffect(() => {
    if (!id) return;

    const fetchTrackCount = async () => {
      setLoadingTracks(true);
      try {
        const res = await axios.get<{ trackCount: number }>(`/api/spotify/artist/${id}/track-count`);
        setTrackCount(res.data.trackCount);
      } catch (err) {
        console.error('발매곡 수 조회 실패', err);
      } finally {
        setLoadingTracks(false);
      }
    };

    fetchTrackCount();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchAlbums = async () => {
      try {
        const res = await axios.get<{ albums: Album[] }>(
          `/api/spotify/artist/${id}/albums`
        );
        setAlbumData(res.data.albums);
      } catch (err) {
        console.error('앨범 조회 실패', err);
      }
    };

    fetchAlbums();
  }, [id]);



  console.log(trackCount);
  console.log(cachedArtist);
  console.log(albumData);

  if (loading) return <div>로딩중...</div>;
  if (!artist) return <div>아티스트 없음</div>;

  return (
    <div className="artist-detail">
      <section className="artist-top">
        <div className="artist-img">
          <Image
            src={artist.images?.[0]?.url ?? '/imgs/default-artist.png'}
            alt={artist.name}
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className='artist-backBtn'>
            <DetailHeader />
          </div>
          <h1 className="artist-name">{artist.name}</h1>
        </div>

        <div className="artist-info">
          <p className="artist-genres">{mapGenres(artist.genres)}</p>
          <p className="artist-tracks">
            총 {loadingTracks ? '로딩중...' : trackCount ?? 0}곡
          </p>
          <p className="artist-followers">
            팔로워 {artist.followers?.total.toLocaleString()}명
          </p>
        </div>
      </section>

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
