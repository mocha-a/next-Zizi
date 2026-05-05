'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelectedTrackStore } from '@/store/useSelectedTrackStore';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TextField from '@mui/material/TextField';
import Back from '@/components/icons/Back';
import TagBtn from '@/components/common/TagBtn';
import DraggableTrackCard from '@/components/entities/track/ui/DraggableTrackCard';

import '@/styles/playlist/NewPlaylist.scss';

const Page = () => {
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');

  const {
    selectedTracks,
    toggleSelect,
    isSelected,
    removeTrack,
    clearSelection,
    reorderTracks
  } = useSelectedTrackStore();

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      name,
      description,
      tracks: selectedTracks, // 👉 여기 중요
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    reorderTracks(result.source.index, result.destination.index);
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
          <div className='new-playlist-back'>
            <Back onBack={clearSelection} />
          </div>
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tracks">
          {(provided) => (
            <div
              className='tracklist'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {selectedTracks.map((track, index) => (
                <Draggable
                  key={track.id}
                  draggableId={String(track.id)}
                  index={index}
                >
                  {(provided) => (
                    <DraggableTrackCard
                      track={track}
                      innerRef={provided.innerRef}
                      draggable={provided.draggableProps}
                      dragHandle={provided.dragHandleProps}
                      isSelected={isSelected(track.id)}
                      onToggle={() => toggleSelect(track)}
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
        tagbtn={`전체 삭제 (${selectedTracks.length})`}
        onClick={clearSelection}
        disabled={selectedTracks.length === 0}
      />
    </div>
  );
};

export default Page;