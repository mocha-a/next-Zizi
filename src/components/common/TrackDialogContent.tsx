'use client';

import { Track } from "@/types/deezer/deezer";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Back from "../icons/Back";

interface Types {
  trackData: Track;  // data
}

type DialogStep = 'default' | 'add';

export default function TrackDialogContent({ trackData }: Types) {
  const menuItems = [
    // { Itemid: 'track', label: '곡 정보', path: `/track/${trackData.id}`, hideOn: '/track'},
    { Itemid: 'artist', label: '아티스트 정보', path: `/artist/${trackData.artist?.id}`, hideOn: '/artist'},
    { Itemid: 'album', label: '앨범 정보', path: `/album/${trackData.album?.id}`, hideOn: '/album'},
  ]
  const [step, setStep] = useState<DialogStep>('default');
  const router = useRouter();
  const pathname = usePathname();

  const handleYouTubeSearch = () => {
    const query = `${trackData.artist.name} ${trackData.title_short}`;
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="track-dialog-content">
      {step === 'default' ? (
        <>
          {menuItems
            .filter(item => !item.hideOn || !pathname?.includes(item.hideOn))
            .map(item => (
              <button key={item.Itemid} onClick={() => router.push(item.path)}>
                {item.label}
              </button>
            ))
          }
          <button onClick={handleYouTubeSearch}>
            유튜브에서 즐기기 ♪
          </button>
          <hr/>
          <button onClick={()=>setStep('add')}>내 플레이리스트에 담기</button>
          {/* <button>좋아요</button> */}
        </>
      ) : (
        <>
          <button>
            <Back/>
          </button>
          <h3>어디에 담을까용?</h3>

          <button>새 플레이리스트에 담기</button>
          <button>기존 플레이리스트에 담기</button>
        </>
      )}
    </div>
  );
}
