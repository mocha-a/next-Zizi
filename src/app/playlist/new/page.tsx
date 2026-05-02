'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelectedTrackStore } from '@/store/useSelectedTrackStore';
import Back from '@/components/icons/Back';
import TextField from '@mui/material/TextField';
import TagBtn from '@/components/common/TagBtn';


import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd';

import '@/styles/playlist/NewPlaylist.scss';
import DraggableTrackCard from '@/components/entities/track/ui/DraggableTrackCard';

const Page = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const {
    tracks,
    selectedIds,
    toggleSelect,
    isSelected,
    setTracks,
    removeTracks
  } = useSelectedTrackStore();

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      name,
      description,
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tracks);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setTracks(items);
  };

  return (
    <div className='new-playlist-page'>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '400px',
        }}
      >
        <div className="new-playlist-header">
          <div className='new-playlist-back'><Back /></div>
          <p className='sub-title'>내 플리 만들기</p>
          <button className='submit' type="submit">저장</button>
        </div>

        <TextField
          label="플리 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="standard"
          placeholder='>>> waiting for title... 제목을 입력해줘'
          required
          fullWidth
        />

        <TextField
          label="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="standard"
          placeholder='>>> describe your vibe... 어떤 기분으로 모았어?'
          fullWidth
        />
      </form>

      <TagBtn
        tagbtn={`+ 곡 추가하기`}
        onClick={() => router.push('/playlist/add-track')}
      />

      {/* ⭐ 여기 핵심 */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tracks">
          {(provided) => (
            <div
              className='tracklist'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tracks.map((track, index) => (
                <Draggable
                  key={track.id}
                  draggableId={String(track.id)}
                  index={index}
                >
                  {(provided) => (
                    <DraggableTrackCard
                      track={track}
                      innerRef={provided.innerRef}
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      isSelected={isSelected(track.id)}
                      onToggle={() => toggleSelect(track.id)}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <TagBtn
        tagbtn={`삭제 (${selectedIds.length})`}
        onClick={removeTracks}
        disabled={selectedIds.length === 0}
      />
    </div>
  );
};

export default Page;