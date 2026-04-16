import React from 'react' 
import { TAG_LIST } from '@/constants/metadata' 
import { CategoryType } from '@/types/deezer/search'; 
import TagSwiper from './TagSwiper'; 
import RecentContent from './RecentContent'; 

const RecentSection = () => { 
  const [type, setType] = React.useState<CategoryType>('track'); 
  
  return ( 
    <> 
      <TagSwiper tagList={TAG_LIST} onChange={setType} /> 
      <RecentContent type={type} /> 
    </> 
  ); 
};

export default RecentSection