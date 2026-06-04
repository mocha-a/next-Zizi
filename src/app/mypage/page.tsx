'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserProfile } from '@/hooks/useUserProfile';
import { usePlaylistEditStore } from '@/store/usePlaylistEditStore';

import LogoutButton from '@/components/auth/LogoutButton';
import PageTitle from '@/components/common/PageTitle';
import TabsContainer from '@/components/common/TabsContainer';
import MyRoom from '@/components/myPage/MyRoom';
import CdImage from '@/components/myPage/CdImage';
import MyPlaylistsSection from '@/components/myPage/myplaylist/MyPlaylistsSection';
import RecentSection from '@/components/myPage/recent/RecentSection';

import '@/styles/myPage/myPage.scss';

function Page() {
  const { isEditMode } = usePlaylistEditStore();
  const { data: session, status } = useSession();
  const { data: user } = useUserProfile(session);

  const router = useRouter();
  const searchParams = useSearchParams();

  const tabValue = searchParams.get('tab') ?? 'recent';
  const tabMap = ['recent', 'myplaylist', 'myroom'];
  const tabIndex = tabMap.indexOf(tabValue);

  // 탭 메뉴
  const tabs = [
    { label: '최근 기록', content: <RecentSection /> },
    { label: '내 플레이리스트', content: <MyPlaylistsSection /> },
    { label: '내 프로필', content: <MyRoom user={user} /> },
  ];

  if (status === 'loading') return null;

  return (
    <div className='myPage-container'>
      <div className={`myPage-topSection ${isEditMode ? 'edit-mode' : ''}`}>
        <div className='myPage-Header'>
          <PageTitle text="내 Zizi !" />
          {session && <LogoutButton />}
        </div>
        <div className='myPage-Hero'>
          <div className='myPage-greeting'>
            {session ? (
              <div>
                <span className='myPage-name'>
                  {user?.nickname ?? user?.name}
                </span> 님의
                <p>
                  아침을 깨우는 <br />
                  상쾌한 비트 시작 -! ♬
                </p>
              </div>
            ) : (
              <div className='guest-greeting'>
                <p>Music is My Life..♬</p>
                <p className='guest-prompt'>
                  지금{' '}
                  <Link href="/login" className="login-link">
                    로그인
                  </Link>
                  하고 <br />
                  너만의 음악세상을 탐험해봐 !
                </p>
              </div>
            )}
          </div>
          <CdImage />
        </div>
      </div>

      <div className={`myPage-tabs ${isEditMode ? 'edit-tabs' : ''}`}>
        <TabsContainer
          tabs={tabs}
          tabValue={tabIndex}
          setTabValue={(index: number) => {
            router.push(`/mypage?tab=${tabMap[index]}`);
          }}
          fullWidth
          width
        />
      </div>
    </div>
  );
}

export default Page;