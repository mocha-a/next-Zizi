import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';

interface PropsType {
  index: number;
  page?: string;
}

const TrackSkeleton = ({ index, page = '' }: PropsType) => {
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
        
        <div>
          <Skeleton variant="text" width={120} height={20} />
          <Skeleton variant="text" width={80} height={15} />
        </div>
      </div>

      {/* 우측 */}
      <div className="trackitem-right skeleton">
        <Image src="/icons/play-bk.svg" alt="재생" width={11} height={14} style={{width: "11px", height: "14px", opacity: 0.3}}/>
        <Image src="/icons/dot3.svg" alt="더보기" width={4} height={18} style={{width: "4px", height: "18px", opacity: 0.3}}/>
      </div>
    </li>
  );
};

export default TrackSkeleton;
