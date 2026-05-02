'use client';
import { SearchTrack } from '@/types/deezer/search';
import TrackSelectItem from './TrackSelectItem';

interface Props {
  track: SearchTrack;
  dragHandleProps?: any;
  draggableProps?: any;
  isSelected: boolean;
  onToggle: () => void;
  innerRef?: (element: HTMLElement | null) => void;
}

const DraggableTrackCard = ({ track, dragHandleProps, draggableProps, innerRef, isSelected, onToggle }: Props) => {
  return (
    <div
      ref={innerRef}
      {...draggableProps}
    >
      <TrackSelectItem
        track={track}
        isSelected={isSelected}
        onToggle={onToggle}
        mode="new"
        dragHandle={dragHandleProps}
      />
    </div>
  );
};

export default DraggableTrackCard;