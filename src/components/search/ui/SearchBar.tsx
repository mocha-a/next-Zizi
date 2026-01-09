"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSearchStore } from '@/store/searchStore';

const SearchBar = () => {
  const router = useRouter();
  const params = useParams<{ query?: string }>();
  const { setSearchQuery } = useSearchStore();

  const [value, setValue] = useState('');

  // ✅ URL → input 동기화 + searchQuery만 세팅
  useEffect(() => {
    if (params?.query) {
      const decoded = decodeURIComponent(params.query);
      setValue(decoded);
      setSearchQuery(decoded);
    } else {
      setValue('');
    }
  }, [params?.query, setSearchQuery]);

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = value.trim();
    if (!query) return;

    setSearchQuery(query);
    router.push(`/search/${encodeURIComponent(query)}`);
  };

  return (
    <form className="search-bar" onSubmit={onSearchSubmit}>
      <input
        type="search"
        placeholder="🎧 요즘 꽂힌 노래 있어 ?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">
        <p>
          <Image
            src="/icons/search-btn.svg"
            alt="searchBtn"
            width={21}
            height={21}
          />
        </p>
      </button>
    </form>
  );
};

export default SearchBar;
