'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTabStore } from '@/store/tabStore';
import { CategoryType } from '@/types/deezer/search';

interface Props {
  title: string;
  type?: CategoryType;
  targetIndex?: number;
}

const SectionHeader = ({ title, type, targetIndex }: Props) => {
  const router = useRouter();
  const { setTabValue } = useTabStore();

  const searchParams = useSearchParams();
  const query = searchParams?.get('query') ?? '';

  const onClick = () => {
    if (typeof targetIndex === 'number') {
      setTabValue(targetIndex);
    }

    if (type && query) {
      router.push(
        `/search?query=${encodeURIComponent(query)}&type=${type}`,
        { scroll: true }
      );
    }
  };

  return (
    <div className="section-header" onClick={onClick}>
      <h2>{title}</h2>
    </div>
  );
};

export default SectionHeader;