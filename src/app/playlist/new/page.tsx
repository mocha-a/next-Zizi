'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTrackStore } from '@/store/useSelectedTrackStore';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import TextField from '@mui/material/TextField';
import Back from '@/components/icons/Back';
import TagBtn from '@/components/common/TagBtn';
import DraggableTrackCard from '@/components/entities/track/ui/DraggableTrackCard';

import '@/styles/playlist/NewPlaylist.scss';

const Page = () => {
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');

  const tracks = useTrackStore(state => state.tracks);
  const orderIds = useTrackStore(state => state.orderIds);
  const selectedIds = useTrackStore(state => state.selectedIds);

  const toggleSelect = useTrackStore(state => state.toggleSelect);
  const clearSelection = useTrackStore(state => state.clearSelection);
  const reorder = useTrackStore(state => state.reorder);

  const playlist = orderIds.map(id => tracks[id]);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      name,
      description,
      tracks: playlist, // 👉 여기 중요
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    reorder(result.source.index, result.destination.index);
  };

  return (
    <div className='new-playlist-page'>
      <form
        className='new-playlist-form'
        onSubmit={handleSubmit}
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

      <div className='new-playlist-btn'>
        <TagBtn
          tagbtn={`+ 곡 추가하기`}
          onClick={() => router.push('/playlist/add-track')}
        />
        <TagBtn
          tagbtn={`삭제 (${selectedIds.length})`}
          onClick={clearSelection}
        />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tracks">
          {(provided) => (
            <div
              className='new-playlist-tracks tracklist'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {playlist.map((track, index) => (
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
                      isSelected={selectedIds.includes(track.id)}
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


    </div>
  );
};

export default Page;