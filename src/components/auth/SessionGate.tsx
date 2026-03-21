// 로그인 상태 전역 관리
'use client';

import { useSession } from 'next-auth/react';
import OnboardingPopup from './MoreInfoPopup';

export default function SessionGate({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === 'loading') return null;

  if (session?.user?.needMoreInfo) {
    return <OnboardingPopup/>;
  }

  return <>{children}</>;
}
