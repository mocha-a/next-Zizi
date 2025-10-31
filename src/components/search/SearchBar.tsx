'use client'

import axios from 'axios';
import Image from 'next/image'

import React, { useState } from 'react'
import { useSearchStore } from '@/store/searchStore';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const { setResults } = useSearchStore();
  const [ query, setQuery ] = useState('');
  const router = useRouter();

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search/${query}`);

    try {
        const res = await axios.get(`/api/spotify/search`, {
        params: { query: query, limit: 5, type: 'artist,album,track,playlist' }
        });
        setResults(res.data);
        console.log('검색 결과:', res.data);
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