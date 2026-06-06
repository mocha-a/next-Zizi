'use client';

import { Track } from "@/types/deezer/deezer";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { MyPlaylist } from "@/types/user/myPlaylist";
import { useQuery } from "@tanstack/react-query";
import { getPlaylists } from "@/lib/api/myPlaylist";
import ThumbnailGrid from "../myPage/myplaylist/ThumbnailGrid";
import Back from "../icons/Back";
import TagBtn from "./TagBtn";

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

  const { data: session } = useSession();
  const { data: user } = useUserProfile(session);

  const handleYouTubeSearch = () => {
    const query = `${trackData.artist.name} ${trackData.title_short}`;
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const { data: playlistsOfUser } = useQuery<MyPlaylist[]>({
    queryKey: ['myplaylist', user?.id],
    queryFn: () => getPlaylists(),
    enabled: !!user?.id,
    staleTime: 0,
  });
  
  return (
    <div className="track-dialog-content">
      {step === 'default' ? (
        <div className="content1-in-dialog">
          {menuItems
            .filter(item => !item.hideOn || !pathname?.includes(item.hideOn))
            .map(item => (
              <button key={item.Itemid} onClick={() => router.push(item.path)}>
                {item.label}
              </button>
            ))
          }
          <button onClick={handleYouTubeSearch}>
            유튜브에서 즐기기 ♩
          </button>
          <hr/>
          <button onClick={() => setStep('add')}>내 플레이리스트에 담기</button>
          {/* <button>좋아요</button> */}
        </div>
      ) : (
        <>

          <div className="content2-in-dialog">
            <div className="title2-in-dialog">
              <Back onBack={() => setStep('default')} className="back-btn-in-dialog"/>
              <h3>˚☆ 이 노래 퍼가기 ★˚</h3>
            </div>
            <div className="new-btn-box">
              <TagBtn tagbtn="새 플레이리스트" className="new-btn-in-dialog"/>
            </div>
            <p className="og-txt-in-dialog">
              {user?.nickname ? user.nickname : user?.name} 님이 생성한 플리에요 !
            </p>
            <div>
              {user && (
                playlistsOfUser?.map((item) => (
                  <button key={item.id} className="playlist-item-in-dialog">
                    <ThumbnailGrid thumbnails={item.thumbnails} className="playlist-thumb-in-dialog"/>
                    <span className="playlist-title-in-dialog">{item.title}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
