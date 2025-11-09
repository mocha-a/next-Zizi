'use client'

import Image from 'next/image'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSearchStore } from '@/store/searchStore';
import { fetchSearch } from '@/lib/fetchSearch';
import { AllResults } from '@/types/spotify';

const SearchBar = () => {
  const { setAllResults  } = useSearchStore();
  const [ query, setQuery ] = useState('');
  const router = useRouter();

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search/${query}`);

    try {
      const data: AllResults = await fetchSearch(query, 'artist,album,track,playlist', 5);
      setAllResults(data);     
    } catch (err) {
      console.error('검색 실패:', err);
    }
  };

  return (
    <form id="search" className='search-bar' onSubmit={(e) => onSearchSubmit(e)}>
      <input 
        type="search" 
        name="search" 
        placeholder="🎧 요즘 꽂힌 노래 있어 ?"
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
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