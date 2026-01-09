import React, { ReactNode } from 'react';
import PageTitle from '@/components/common/PageTitle';
import SearchBar from '@/components/search/ui/SearchBar';

interface props {
  children?: ReactNode;
}

const SearchLayout: React.FC<props> = ({ children }) => {
  return (
    <div className='search-container'>
      <PageTitle text="검색" />
      <SearchBar />
      {children}
    </div>
  );
};

export default SearchLayout;
