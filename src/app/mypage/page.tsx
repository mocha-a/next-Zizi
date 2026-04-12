'use client';

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import LogoutButton from '@/components/auth/LogoutButton';
import Link from 'next/link';
import PageTitle from '@/components/common/PageTitle';

import { useTabStore } from '@/store/tabStore';
import MyPlaylistsSection from '@/components/myPage/MyPlaylistsSection';
import RecentSection from '@/components/myPage/RecentSection';
import TabsContainer from '@/components/common/TabsContainer';
import '@/styles/myPage/myPage.scss';
import LikedSection from '@/components/myPage/LikedSection';

interface User {
  name: string | null;
  email: string | null;
  birth: string | null;
  gender: string | null;
}

function page() {
  const { data: session, status } = useSession();
  const { tabValue, setTabValue } = useTabStore();
  const [ user, setUser ] = useState<User | null>(null);

  // 탭 메뉴
  const tabs = [
    { label: '최근 기록', content: <RecentSection />},
    { label: '좋아요', content: <LikedSection />},
    { label: '내 플레이리스트', content: <MyPlaylistsSection />},
  ];

  useEffect(() => {
    fetch('/api/user/profile')
    .then(res => res.json())
    .then(data => setUser(data));
  },[]);

  if ( status === "loading" ) return null;

  return (
    <div className='myPage-container'>
      <PageTitle text="나의 Zizi" />
      <div className='myPage-greeting'>{session ? (
        `[PLAY] ${session.user.name}님의 아침을 깨우는 상쾌한 비트 시작-! ♬`
      ):(
        <div>
          Music is My Life..♬ <br /><br />
          <p className='guest-prompt'>
            지금 <Link href="/login" className="login-link">로그인</Link>하고 <br />
            너만의 음악세상을 탐험해봐 -!
          </p>
        </div>
        )}
      </div>
      
      {/* 테스트용 사용자 정보
      <div>
        <p>이름: {user?.name ?? ''}</p>
        <p>이메일: {user?.email ?? ''}</p>
        <p>생년월일: {user?.birth ?? '미입력'}</p>
        <p>성별: {user?.gender ?? '미입력'}</p>
      </div> */}

      {/* 로그아웃 버튼 */}
      { session && <LogoutButton/>}
      
      {/* 로그인 버튼
      { !session && (
        <Link href={'/login'}>
          로그인 하러 가기
        </Link>
      )} */}

      <div className='myPage-tabs'>
        <TabsContainer
          tabs={tabs}
          tabValue={tabValue}
          setTabValue={setTabValue}
          fullWidth
          width
        />
      </div>
    </div>
  )
}

export default page