import React, { useState } from 'react';
import TagBtn from '@/components/common/TagBtn';
import { CategoryType } from '@/types/deezer/search';
import { TagItem } from '@/constants/metadata';

interface Props {
  tagList: TagItem[];
  onChange?: (tagId: CategoryType) => void;
}

function TagSwiper({ tagList, onChange }: Props) {
  const [selectedTag, setSelectedTag] = useState<CategoryType>(
    tagList[0]?.id || ''
  );

  const handleClick = (id: CategoryType) => {
    setSelectedTag(id);
    onChange?.(id);
  };

  return (
    <div className='tagbtn-box'>
        {tagList.map((tag) => (
            <button key={tag.id} onClick={() => handleClick(tag.id)}>
              <TagBtn
                tagbtn={tag.name}
                className={`tagbtn ${selectedTag === tag.id ? 'active' : ''}`}
              />
            </button>
        ))}
    </div>
  );
}

export default TagSwiper;