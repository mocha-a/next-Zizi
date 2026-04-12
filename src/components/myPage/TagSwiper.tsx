import React, { useState } from 'react';
import TagBtn from '@/components/common/TagBtn';

interface TagSwiperProps {
  tagList: { id: string; name: string }[];
  onChange?: (tagId: string) => void; // 선택값만 부모에 알려주고 싶으면
}

function TagSwiper({ tagList, onChange }: TagSwiperProps) {
  const [selectedTag, setSelectedTag] = useState(tagList[0]?.id || '');

  const handleClick = (id: string) => {
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