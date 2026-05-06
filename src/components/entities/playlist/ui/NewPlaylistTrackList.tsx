'use client';
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { SearchTrack } from '@/types/deezer/search';
import DraggableTrackCard from '@/components/entities/track/ui/DraggableTrackCard';

interface Props {
  playlist: SearchTrack[];
  selectedIds: number[];
  onToggle: (track: SearchTrack) => void;
  onDragEnd: (result: DropResult) => void;
}

const NewPlaylistTrackList = ({ playlist, selectedIds, onToggle, onDragEnd }: Props) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                    onToggle={() => onToggle(track)}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default NewPlaylistTrackList;