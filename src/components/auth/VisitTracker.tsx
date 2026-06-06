'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { updateLastVisited } from '@/lib/api/user';

// 마지막 접속
export default function VisitTracker() {
  const { data: session } = useSession();

  const { mutate } = useMutation({
    mutationFn: updateLastVisited
  });

  useEffect(() => {
    if (!session?.user?.id) return;

    mutate();
  }, [session?.user?.id, mutate]);

  return null;
}