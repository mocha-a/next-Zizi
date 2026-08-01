import React from 'react'
import Image from "next/image";
import TrackItemRight from './TrackItemRight';
import { Track } from '@/types/deezer/deezer';
import { useRouter } from 'next/navigation';

interface PropsType {
    track: Track;  // data
    index: number;
    page?: string;      // page에 따라 UI 변경
}

function TrackItem({track, page = '', index}: PropsType) {
    const router = useRouter();

  return (
    <li>
        {/* 좌측 이미지 섹션: 앨범 이미지 */}
        <div className='trackitem-left'>
            {/* 메인 홈에 표시할 차트 숫자 */}
            {page === 'home' && (
                <span className='trackitem-num-home'>{index + 1}</span>
            )}

            <div className='trackitem-image' onClick={() => router.push(`/album/${track.album?.id}`)}>
                <Image
                src={track?.album?.cover_medium || "/default.png"}
                alt="album"
                width={45}
                height={45}
                />
            </div>
        </div>

        {/* 가수 및 제목 정보 */}
        <div className='trackitem-center'>
            {/* 차트 메뉴에 표시할 차트 숫자 */}
            {page === 'chart' && (
                <span className='trackitem-num-chart'>{index + 1}</span>
            )}
            
            <div>
                <p>{track?.title}</p>
                <span onClick={() => router.push(`/artist/${track?.artist?.id}`)}>{track?.artist?.name}</span>
            </div>
        </div>

        {/* 아이콘 섹션: 재생 및 더보기 */}
        <div className='trackitem-right'>
            <TrackItemRight trackData={track} />
        </div>
    </li>
  )
}

export default TrackItem