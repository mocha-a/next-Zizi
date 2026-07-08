'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserProfile } from '@/hooks/useUserProfile';
import { usePlaylistEditStore } from '@/store/usePlaylistEditStore';
import { getGreeting } from '@/lib/getGreeting';

import LogoutButton from '@/components/auth/LogoutButton';
import PageTitle from '@/components/common/PageTitle';
import TabsContainer from '@/components/common/TabsContainer';
import MyRoom from '@/components/myPage/MyRoom';
import CdImage from '@/components/myPage/CdImage';
import MyPlaylistsSection from '@/components/myPage/myplaylist/MyPlaylistsSection';
import RecentSection from '@/components/myPage/recent/RecentSection';

import '@/styles/myPage/myPage.scss';
import Popup from '@/components/common/Popup';

function Page() {
  const { isEditMode } = usePlaylistEditStore();
  const { data: session, status } = useSession();
  const { data: user } = useUserProfile(session);

  const [popupType, setPopupType] = useState<'loginPlaylist' | 'loginMyRoom' | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const tabValue = searchParams.get('tab') ?? 'recent';
  const tabMap = ['recent', 'myplaylist', 'myroom'];
  const tabIndex = tabMap.indexOf(tabValue);

  const name = user?.nickname || user?.name || 'zi존이';

  // 탭 메뉴
  const tabs = [
    { label: '최근 기록', content: <RecentSection /> },
    { label: '내 플리', content: <MyPlaylistsSection /> },
    { label: '내 프로필', content: <MyRoom user={user} /> },
  ];

  const greeting = useMemo(() => getGreeting(), []);

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
                <p>
                  {greeting.lines.map((line, index) => (
                    <span key={index}>
                      {line.map((segment, i) =>
                        segment.isName ? (
                          <span key={i} className='myPage-name'> {name} </span>
                        ) : (
                          <span key={i} className='myPage-emoji'> {segment.text} </span>
                        )
                      )}
                      <br />
                    </span>
                  ))}
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
          <div className="myPage-cdWrapper">
            <CdImage />
          </div>
        </div>
      </div>

      <div className={`myPage-tabs ${isEditMode ? 'edit-tabs' : ''}`}>
        <TabsContainer
          tabs={tabs}
          tabValue={tabIndex}
          setTabValue={(index: number) => {
            const targetTab = tabMap[index];

            if (!session && targetTab === 'myplaylist') {
              setPopupType('loginPlaylist');
              return;
            }

            if (!session && targetTab === 'myroom') {
              setPopupType('loginMyRoom');
              return;
            }

            router.push(`/mypage?tab=${targetTab}`);
          }}
          fullWidth
          width
        />
      </div>

      {popupType && (
        <Popup
          type={popupType}
          onClose={() => setPopupType(null)}
          onConfirm={() => router.push('/login')}
          onCancel={() => {
            router.push('/mypage?tab=recent');
          }}
        />
      )}
    </div>
  );
}

export default Page;