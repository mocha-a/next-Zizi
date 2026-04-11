'use client';

import { Track } from "@/types/deezer/deezer";
import { usePathname, useRouter } from "next/navigation";

interface Types {
  trackData: Track;  // data
}

export default function TrackDialogContent({ trackData }: Types) {
  const menuItems = [
    { Itemid: 'track', label: '곡 정보', path: '/chart', hideOn: '/track'},
    { Itemid: 'artist', label: '아티스트 정보', path: `/search/artist/${trackData.artist?.id}`, hideOn: '/artist'},
    { Itemid: 'album', label: '앨범 정보', path: `/search/album/${trackData.album?.id}`, hideOn: '/album'},
  ]
  const router = useRouter();
  const pathname = usePathname();

  const handleYouTubeSearch = () => {
    const query = `${trackData.artist.name} ${trackData.title_short}`;
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="track-dialog-content">
      {menuItems
        .filter(item => !item.hideOn || !pathname?.includes(item.hideOn))
        .map(item => (
          <button key={item.Itemid} onClick={() => router.push(item.path)}>
            {item.label}
          </button>
        ))
      }
      {/* <button onClick={()=>{console.log(trackData.id)}}>
        곡 정보
      </button>
      <button onClick={() => router.push(`/search/artist/${trackData.artist.id}`)}>
        아티스트 정보
      </button>
      <button onClick={() => router.push(`/search/album/${trackData.album.id}`)}>
        앨범 정보
      </button> */}
      <button onClick={handleYouTubeSearch}>
        유튜브에서 즐기기 ♪
      </button>
      <hr/>
      <button>내 플레이리스트에 담기</button>
      <button>좋아요</button>
    </div>
  );
}
