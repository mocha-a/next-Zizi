'use client';

import TrackItem from '@/components/common/TrackItem';
import { SearchTrack } from '@/types/deezer/search';

interface Props {
  track: SearchTrack;
  index: number;
  dragHandleProps?: any;
  draggableProps?: any;
  innerRef?: (element: HTMLElement | null) => void;
  onRemove: (id: number) => void;
}

const DraggableTrackCard = ({
  track,
  index,
  dragHandleProps,
  draggableProps,
  innerRef,
  onRemove,
}: Props) => {
  return (
    <div
      ref={innerRef}
      {...draggableProps}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px',
      }}
    >
      {/* 드래그 핸들 */}
      <div
        {...dragHandleProps}
        style={{
          cursor: 'grab',
          padding: '4px',
          userSelect: 'none',
        }}
      >
        ≡
      </div>

      {/* 트랙 */}
      <div style={{ flex: 1 }}>
        <TrackItem track={track} index={index} page="edit" />
      </div>

      {/* 삭제 */}
      <button
        onClick={() => onRemove(track.id)}
        style={{
          color: 'red',
          fontSize: '12px',
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default DraggableTrackCard;