import React from 'react'
import Image from "next/image";
import PlayBk from "../icons/PlayBk";
import Dot3 from "../icons/Dot3";

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
        <div className='chart-left'>
            {/* 메인 홈에 표시할 차트 숫자 */}
            {page === 'home' && (
                <span className='chart-num-home'>{index + 1}</span>
            )}

            <div className='chart-image'>
                <Image
                src={trackData.image}
                alt="album"
                width={45}
                height={45}
                />
            </div>
        </div>

        {/* 가수 및 제목 정보 */}
        <div className='chart-center'>
            {/* 차트 메뉴에 표시할 차트 숫자 */}
            {page === 'chart' && (
                <span className='chart-num-chart'>{index + 1}</span>
            )}
            
            <div>
                <p>{trackData.name}</p>
                <span>{trackData.artist.name}</span>
            </div>
        </div>

        {/* 아이콘 섹션: 재생 및 더보기 */}
        <div className='chart-right'>
            <PlayBk className={"icons-play"}/>
            <Dot3 className={"icons-dot"}/>
        </div>
    </li>
  )
}

export default TrackItem