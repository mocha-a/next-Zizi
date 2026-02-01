'use client';

interface Artist {
    name: string;
}

interface Track {
    name: string;
    artist: Artist;
}

interface Props {
    trackData: Track;  // data
}

export default function TrackDialogContent({ trackData }: Props) {
  return (
    <div className="track-dialog-content">
      <button onClick={()=>{console.log(trackData.name)}}>
        곡 정보
      </button>
      <button>아티스트 정보</button>
      <button>앨범 정보</button>
      <hr/>
      <button>내 플레이리스트에 담기</button>
      <button>좋아요</button>
    </div>
  );
}
