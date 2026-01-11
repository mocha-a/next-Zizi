import React from 'react'
import Image from "next/image";
import TrackItemRight from './TrackItemRight';

interface Artist {
    name: string;
}

interface Track {
    image: string;
    name: string;
    artist: Artist;
}

interface PropsType {
    trackData: Track;  // data
    index: number;
    page: string;      // page에 따라 UI 변경
}

function TrackItem({trackData, page = '', index}: PropsType) {
  return (
    <li>
        {/* 좌측 이미지 섹션: 앨범 이미지 */}
        <div className='trackitem-left'>
            {/* 메인 홈에 표시할 차트 숫자 */}
            {page === 'home' && (
                <span className='trackitem-num-home'>{index + 1}</span>
            )}

            <div className='trackitem-image'>
                <Image
                src={trackData.image}
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
                <p>{trackData.name}</p>
                <span>{trackData.artist.name}</span>
            </div>
        </div>

        {/* 아이콘 섹션: 재생 및 더보기 */}
        <div className='trackitem-right'>
            <TrackItemRight track={trackData}/>
        </div>
    </li>
  )
}

export default TrackItem