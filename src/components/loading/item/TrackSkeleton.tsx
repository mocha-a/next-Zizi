import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Plus from '@/components/icons/Plus';
import PlayBk from '@/components/icons/PlayBk';
import Dot3 from '@/components/icons/Dot3';

interface PropsType {
  index: number;
  page?: string;
  mode?: 'default' | 'add';
}

const TrackSkeleton = ({ index, page = '', mode = 'default' }: PropsType) => {
  return (
    <li>
      {/* 좌측 이미지 섹션 */}
      <div className='trackitem-left'>
        {page === 'home' && (
          <span className='trackitem-num-home'>{index + 1}</span>
        )}

        <div className='trackitem-image'>
          <Skeleton variant="rounded" width={45} height={45} />
        </div>
      </div>

      {/* 중앙 */}
      <div className='trackitem-center'>
        {page === 'chart' && (
          <span className='trackitem-num-chart'>{index + 1}</span>
        )}
        
        <div style={{ alignItems: 'center' }}>
          <p>
            <Skeleton variant="rectangular" width={120} height={15} />
          </p>
          <Skeleton variant="rectangular" width={80} height={13} />
        </div>
      </div>

      {/* 우측 */}
      <div className="trackitem-right skeleton">
        {mode === 'add' ? (
          <Plus color="rgba(26, 26, 26, 0.3)" />
        ) : (
          <>
            <PlayBk className="icons-play" opacity={0.3} />
            <Dot3 className="icons-dot"  opacity={0.3} />
          </>
        )}
      </div>
    </li>
  );
};

export default TrackSkeleton;