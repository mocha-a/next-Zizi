'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSearchStore } from '@/store/searchStore';
import { usePathname } from 'next/navigation';
import { doSearch } from '@/lib/search';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [ query, setQuery ] = useState('');

  const pathname = usePathname();
  const router = useRouter();

  // 페이지가 /search일 때 query값 초기화
  useEffect(() => {
    if (pathname === '/search') {
      setQuery('');           // 로컬 state 초기화
      setSearchQuery('');     // store 초기화
    }
  }, [pathname, setSearchQuery]);


  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    await doSearch(query, router);
  };

  return (
    <form id="search" className='search-bar' onSubmit={(e) => onSearchSubmit(e)}>
      <input 
        type="search" 
        name="search" 
        placeholder="🎧 요즘 꽂힌 노래 있어 ?"
        value={searchQuery}
        onChange={(e) => {
        setQuery(e.target.value);        // 로컬 state 업데이트
        setSearchQuery(e.target.value);  // store에도 업데이트
      }}
      />
      <button type='submit'>
        <p>
        <Image
          src='/icons/search-btn.svg'
          alt='searchBtn'
          width={21}
          height={21}
        />
        </p>
      </button>
    </form>
  )
}

export default SearchBar