'use client';

import React from 'react'
import { useSession } from 'next-auth/react';
import LogoutButton from '@/components/Login/LogoutButton';

function page() {
  const { data: session, status } = useSession();

  if ( status === "loading" ) return null;

  return (
    <div>
      <p>{session ? `${session.user.name}님 안녕하세요.` : '로그인을 해주세요.'}</p>
      { session && <LogoutButton/>}
    </div>
  )
}

export default page