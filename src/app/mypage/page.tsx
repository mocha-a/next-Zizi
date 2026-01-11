'use client';

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import LogoutButton from '@/components/auth/LogoutButton';
import Link from 'next/link';

interface User {
  name: string | null;
  email: string | null;
  birth: string | null;
  gender: string | null;
}

function page() {
  const { data: session, status } = useSession();
  const [ user, setUser ] = useState<User | null>(null);

  useEffect(() => {
    fetch('/api/user/profile')
    .then(res => res.json())
    .then(data => setUser(data));
  },[]);

  if ( status === "loading" ) return null;

  return (
    <div>
      <p>{session ? `${session.user.name}님 안녕하세요.` : '로그인을 해주세요.'}</p>

      {/* 테스트용 사용자 정보 */}
      <div>
        <p>이름: {user?.name ?? ''}</p>
        <p>이메일: {user?.email ?? ''}</p>
        <p>생년월일: {user?.birth ?? '미입력'}</p>
        <p>성별: {user?.gender ?? '미입력'}</p>
      </div>

      {/* 로그아웃 버튼 */}
      { session && <LogoutButton/>}
      
      {/* 로그인 버튼 */}
      { !session && (
        <Link href={'/login'}>
          로그인 하러 가기
        </Link>
      )}
    </div>
  )
}

export default page