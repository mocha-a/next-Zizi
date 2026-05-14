'use client';

import { DropResult } from '@hello-pangea/dnd';
import { SearchTrack } from '@/types/deezer/search';

import DndList from '@/components/common/dnd/DndList';
import DraggableTrackCard from '@/components/entities/playlist/ui/track/DraggableTrackCard';

interface Props {
  playlist: SearchTrack[];
  selectedIds: number[];
  onToggle: (track: SearchTrack) => void;
  onDragEnd: (result: DropResult) => void;
}

const PlaylistTrackListDnD = ({ playlist, selectedIds, onToggle, onDragEnd }: Props) => {
  return (
    <DndList
      items={playlist}
      droppableId="tracks"
      onDragEnd={onDragEnd}
      getId={(track) => String(track.id)}
      className="new-playlist-tracks tracklist"
      renderItem={(track, provided) => (
        <DraggableTrackCard
          track={track}
          innerRef={provided.innerRef}
          draggable={provided.draggableProps}
          dragHandle={provided.dragHandleProps}
          isSelected={selectedIds.includes(track.id)}
          onToggle={() => onToggle(track)}
        />
      )}
    />
  );
};

export default PlaylistTrackListDnD;