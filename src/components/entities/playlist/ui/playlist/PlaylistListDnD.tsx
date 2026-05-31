'use client';

import { DropResult } from '@hello-pangea/dnd';
import { MyPlaylist } from '@/types/user/myPlaylist';

import DndList from '@/components/common/dnd/DndList';
import DraggablePlaylistCard from '@/components/entities/playlist/ui/playlist/DraggablePlaylistCard';

interface Props {
  playlists: MyPlaylist[];
  selectedIds: number[];
  isEditMode: boolean;
  onToggle: (id: number) => void;
  onDragEnd: (result: DropResult) => void;
}

const PlaylistListDnD = ({ playlists, selectedIds, isEditMode, onToggle, onDragEnd }: Props) => {
  return (
    <DndList
      items={playlists}
      droppableId="playlists"
      onDragEnd={onDragEnd}
      getId={(playlist) => String(playlist.id)}
      className="playlist-list"
      renderItem={(playlist, provided) => (
        <DraggablePlaylistCard
          playlist={playlist}
          innerRef={provided.innerRef}
          draggable={provided.draggableProps}
          dragHandle={provided.dragHandleProps}
          isEditMode={isEditMode}
          isSelected={selectedIds.includes(playlist.id)}
          onToggle={() => onToggle(playlist.id)}
        />
      )}
    />
  );
};

export default PlaylistListDnD;