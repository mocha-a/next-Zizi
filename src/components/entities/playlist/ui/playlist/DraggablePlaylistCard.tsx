'use client';

import { DraggableProvided } from '@hello-pangea/dnd';

import { MyPlaylist } from '@/types/user/myPlaylist';
import DraggableItem from '@/components/common/dnd/DraggableItem';
import PlaylistCard from './PlaylistCard';
import ThumbnailGrid from '@/components/myPage/myplaylist/ThumbnailGrid';

interface Props {
  playlist: MyPlaylist;
  draggable?: DraggableProvided['draggableProps'];
  dragHandle?: DraggableProvided['dragHandleProps'];
  isSelected: boolean;
  isEditMode: boolean;
  onToggle: () => void;
  innerRef?: (element: HTMLElement | null) => void;
}

const DraggablePlaylistCard = ({ playlist, draggable, dragHandle, innerRef, isSelected, isEditMode, onToggle }: Props) => {
  return (
    <DraggableItem
      innerRef={innerRef}
      draggable={draggable}
    >
      <PlaylistCard
        key={playlist.id}
        thumbnail={
          <ThumbnailGrid
            thumbnails={playlist.thumbnails || []}
            className="small-thumbnail"
          />
        }
        title={playlist.title}
        user={playlist.user.name}
        tracks={playlist.tracks.length}
        isEditMode={isEditMode}
        isSelected={isSelected}
        onClick={onToggle}
        dragHandle={dragHandle}
      />
    </DraggableItem>
  );
};

export default DraggablePlaylistCard;