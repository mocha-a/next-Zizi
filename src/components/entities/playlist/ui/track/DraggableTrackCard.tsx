'use client';

import { DraggableProvided } from '@hello-pangea/dnd';
import { SearchTrack } from '@/types/deezer/search';
import DraggableItem from '@/components/common/dnd/DraggableItem';
import TrackSelectItem from '../../../track/ui/TrackSelectItem';

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
    <DraggableItem
      innerRef={innerRef}
      draggable={draggable}
    >
      <TrackSelectItem
        track={track}
        isSelected={isSelected}
        onToggle={onToggle}
        mode="new"
        dragHandle={dragHandle}
      />
    </DraggableItem>
  );
};

export default DraggableTrackCard;