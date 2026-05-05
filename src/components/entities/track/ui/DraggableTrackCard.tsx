'use client';
import { DraggableProvided } from '@hello-pangea/dnd';
import { SearchTrack } from '@/types/deezer/search';
import TrackSelectItem from './TrackSelectItem';

interface Props {
  track: SearchTrack;
  draggable?: DraggableProvided['draggableProps'];
  dragHandle?: DraggableProvided['dragHandleProps'];
  isSelected: boolean;
  onToggle: () => void;
  innerRef?: (element: HTMLElement | null) => void;
}

const DraggableTrackCard = ({ track, draggable, dragHandle, innerRef, isSelected, onToggle }: Props) => {
  return (
    <div
      ref={innerRef}
      {...draggable}
    >
      <TrackSelectItem
        track={track}
        isSelected={isSelected}
        onToggle={onToggle}
        mode="new"
        dragHandle={dragHandle}
      />
    </div>
  );
};

export default DraggableTrackCard;