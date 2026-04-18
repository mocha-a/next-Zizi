'use client';

import React from 'react'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useTabStore } from '@/store/tabStore';
import { useUserProfile } from '@/hooks/useUserProfile';

import LogoutButton from '@/components/auth/LogoutButton';
import PageTitle from '@/components/common/PageTitle';
import TabsContainer from '@/components/common/TabsContainer';
import MyPlaylistsSection from '@/components/myPage/MyPlaylistsSection';
import RecentSection from '@/components/myPage/recent/RecentSection';
import CdImage from '@/components/myPage/CdImage';

import '@/styles/myPage/myPage.scss';

function Page() {
  const { data: session, status } = useSession(); // 로그인 여부 체크용
  const { data: user } = useUserProfile(session); // 메인 데이터

  const { tabValue, setTabValue } = useTabStore();

  // 탭 메뉴
  const tabs = [
    { label: '최근 기록', content: <RecentSection />},
    { label: '내 플레이리스트', content: <MyPlaylistsSection />},
  ];

  if ( status === "loading" ) return null;

  return (
    <div className='myPage-container'>
      <div className='myPage-Header'>
        <PageTitle text="내 Zizi !" />
        {/* 로그아웃 버튼 */}
        { session && <LogoutButton/>}
      </div>
      <div className='myPage-Hero'>
        <div className='myPage-greeting'>{session ? (
          <div>
            <span className='myPage-name'>{user?.name}</span> 님의
            <p>아침을 깨우는 <br />상쾌한 비트 시작 -! ♬</p>
          </div>
        ):(
          <div className='guest-greeting'>
            <p>Music is My Life..♬</p>
            <p className='guest-prompt'>
              지금 <Link href="/login" className="login-link">로그인</Link>하고 <br />
              너만의 음악세상을 탐험해봐 !
            </p>
          </div>
          )}
        </div>
        <CdImage />
      </div>
      
      {/* 테스트용 사용자 정보
      <div>
        <p>이름: {user?.name ?? ''}</p>
        <p>이메일: {user?.email ?? ''}</p>
        <p>생년월일: {user?.birth ?? '미입력'}</p>
        <p>성별: {user?.gender ?? '미입력'}</p>
      </div> */}

      
      
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

export default Page