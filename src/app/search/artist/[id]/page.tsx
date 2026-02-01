'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useTabStore } from '@/store/tabStore';
import { artistById } from '@/lib/search';

import TabsContainer from '@/components/common/TabsContainer';
import DetailHeader from '@/components/common/DetailHeader';
import ArtistAlbums from '@/components/entities/artist/container/ArtistAlbums';
import ArtistTracks from '@/components/entities/artist/container/ArtistTrack';

import { mapGenres, Artist } from '@/types/spotify';

import '@/styles/artist/artist.scss';

const Page = () => {
  // URL에서 아티스트 id 추출
  const { id } = useParams() as { id: string };

  // 탭 상태
  const { tabValue, setTabValue } = useTabStore();

  // 아티스트 상세 데이터 (항상 로컬)
  const [ artist, setArtist ] = useState<Artist | null>(null);
  const [ loading, setLoading ] = useState(true);

  // 발매곡 수
  const [ trackCount, setTrackCount ] = useState<number | null>(null);
  const [ loadingTracks, setLoadingTracks ] = useState(false);

  // 탭 정의
  const tabs = [
    { label: '인기곡', content: <ArtistTracks id={id} /> },
    { label: '앨범', content: <ArtistAlbums id={id} /> },
  ];

  /**
   * 아티스트 단건 조회
   * - id 기준으로 항상 새로 fetch
   */
  useEffect(() => {
    if (!id) return;

    const fetchArtist = async () => {
      setLoading(true);
      try {
        const data = await artistById(id);
        setArtist(data);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  /**
   * 발매곡 수 조회 + 탭 초기화
   */
  useEffect(() => {
    if (!id) return;

    setTabValue(0);

    const fetchTrackCount = async () => {
      setLoadingTracks(true);
      try {
        const res = await axios.get<{ trackCount: number }>(
          `/api/spotify/artist/${id}/track-count`
        );
        setTrackCount(res.data.trackCount);
      } catch (err) {
        console.error('발매곡 수 조회 실패', err);
      } finally {
        setLoadingTracks(false);
      }
    };

    fetchTrackCount();
  }, [id, setTabValue]);

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

          <div className="artist-backBtn">
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