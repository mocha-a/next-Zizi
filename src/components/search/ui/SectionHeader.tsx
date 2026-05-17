'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CategoryType } from '@/types/deezer/search';

interface Props {
  title: string;
  type?: CategoryType;
}

const SectionHeader = ({ title, type }: Props) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const query = searchParams?.get('query') ?? '';

  const onClick = () => {
    if (type && query) {
      router.push(
        `/search?query=${encodeURIComponent(query)}&type=${type}`,
        { scroll: true }
      );
    }
  };

  return (
    <div className='section-header' onClick={onClick}>
      <h2>{title}</h2>
    </div>
  );
};

export default SectionHeader;