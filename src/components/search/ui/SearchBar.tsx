'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  placeholder: string;
  onSearch?: (query: string) => void;
}

const SearchBar = ({ placeholder, onSearch }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState('');

  useEffect(() => {
    if (!searchParams) return;

    const queryParam = searchParams.get('query');

    if (queryParam) {
      setValue(queryParam);
    } else {
      setValue('');
    }
  }, [searchParams]);

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = value.trim();
    if (!query) return;

    if (onSearch) {
      onSearch(query);
    } else {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form className="search-bar" onSubmit={onSearchSubmit}>
      <input
        type="search"
        placeholder={placeholder}
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