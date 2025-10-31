import React, { ReactNode } from 'react';
import PageTitle from '@/components/common/PageTitle';
import SearchBar from '@/components/search/SearchBar';


interface Props {
  children?: ReactNode;
}

const SearchLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className='search-container'>
      <PageTitle text="검색" />
      <SearchBar />
      {children}
    </div>
  );
};

export default SearchLayout;
