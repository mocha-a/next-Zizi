'use client';
import React from 'react';
import TagBtn from '@/components/common/TagBtn';

interface Props {
  selectedCount: number;
  onAddTrack: () => void;
  onDelete: () => void;
}

const NewPlaylistActions = ({ selectedCount, onAddTrack, onDelete }: Props) => {
  return (
    <div className='new-playlist-btn'>
      <TagBtn
        tagbtn={`+ 곡 추가하기`}
        onClick={onAddTrack}
      />
      <TagBtn
        tagbtn={`삭제 (${selectedCount})`}
        onClick={onDelete}
      />
    </div>
  );
};

export default NewPlaylistActions;