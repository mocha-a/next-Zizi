'use client';

import { Track } from "@/types/deezer/deezer";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { MyPlaylist } from "@/types/user/myPlaylist";
import { useQuery } from "@tanstack/react-query";
import { getPlaylists } from "@/lib/api/myPlaylist";
import Back from "../icons/Back";
import Plus from "../icons/Plus";
import TagBtn from "./TagBtn";
import PlaylistSwiplerinDialog from "./PlaylistSwiperinDialog";
import TextField from "@mui/material/TextField";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import Popup from "./Popup";
import AddPlaylistButton from "./AddPlaylistButton";

interface Types {
  trackData: Track;  // data
}

type DialogStep = 'default' | 'add' | 'new';

export default function TrackDialogContent({ trackData }: Types) {
  const menuItems = [
    // { Itemid: 'track', label: '곡 정보', path: `/track/${trackData.id}`, hideOn: '/track'},
    { Itemid: 'artist', label: '아티스트 정보', path: `/artist/${trackData.artist?.id}`, hideOn: '/artist'},
    { Itemid: 'album', label: '앨범 정보', path: `/album/${trackData.album?.id}`, hideOn: '/album'},
  ]
  const [step, setStep] = useState<DialogStep>('default');
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const addSong = usePlaylistStore((state) => state.addSong);

  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = useSession();
  const { data: user } = useUserProfile(session);

  const handleYouTubeSearch = () => {
    const query = `${trackData.artist.name} ${trackData.title_short}`;
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSelectTrack = ( e: React.MouseEvent<HTMLAnchorElement> ) => {
    if (!session) {
      e.preventDefault();

      setShowLoginPopup(true); // 로그아웃 상태일때 내플리추가 버튼 추가시 로그인 팝업 뜨게 했어요 !
      return;
    }

    // addSong(song); << 여기에 곡정보를 넣어주시면 돼요 ! 주스탠드 입니다
  };

  // AddPlaylistButton 따로 뺀 컴포넌트에요 !
  // 페이지 넘어가면 또 useSelectedTrackStore.ts 여기가 선택한 곡들을 관리하는 주스탠드인데
  // props로 보낸 곡을 useSelectedTrackStore 여기 목록에다가 넣어야 돼요 !!

  // <AddPlaylistButton onClick={handleSelectTrack} />

  const { data: playlistsOfUser } = useQuery<MyPlaylist[]>({
    queryKey: ['myplaylist', user?.id],
    queryFn: () => getPlaylists(),
    enabled: !!user?.id,
    staleTime: 0,
  });
  
  return (
    <div className="track-dialog-content">
      {step === 'default' && (
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
      )}

      {step === 'add' && (
        <div className="content2-in-dialog">
          <div className="title2-in-dialog">
            <Back onBack={() => setStep('default')} className="back-btn-in-dialog"/>
            <h3>˚☆ 이 노래 퍼가기 ★˚</h3>
          </div>
          <div className="new-btn-box">
            <Plus color="#058CD7"/>
            <button className="new-btn-in-dialog" onClick={() => setStep('new')}>
              새 플레이리스트
            </button>
          </div>
          <p className="og-txt-in-dialog">
            {user?.nickname ? user.nickname : user?.name} 님이 생성한 플리에요 !
          </p>
          <PlaylistSwiplerinDialog myListItem={playlistsOfUser}/>
          <div className="complete-btn-box-in-dialog">
            <TagBtn tagbtn="선택" className="complete-btn-in-dialog"/>
          </div>
        </div>
      )}
      
      {step === 'new' && (
        <div className="content3-in-dialog">
          <div className="title2-in-dialog">
            <Back onBack={() => setStep('add')} className="back-btn-in-dialog"/>
          </div>
          <h3>나만의 플리 이름을 지어볼까?</h3>
          <TextField
            label="플리 이름"
            value={name}
            // onChange={(e) => onChangeName(e.target.value)}
            variant="standard"
            placeholder='>>> waiting for title... 제목을 입력해줘'
            required
            fullWidth
            sx={inputStyle}
          />
          <div className="complete-btn-box-in-dialog">
            <TagBtn tagbtn="완료" className="complete-btn-in-dialog"/>
          </div>
        </div>
      )}

      {showLoginPopup && (
        <Popup
          type="loginPlaylist"
          onClose={() => setShowLoginPopup(false)}
          onConfirm={() => router.push('/login')}
        />
      )}
    </div>
  );
}

// 스타일 분리
const inputStyle = {
  '& .MuiInputBase-input': {
    fontFamily: 'var(--font-gmarketMedium)',
    fontSize: '16px',
  },
  '& .MuiFormLabel-root': {
    fontFamily: 'var(--font-gmarketMedium)',
    fontSize: '16px',
  },
  '& .MuiFormLabel-root.MuiInputLabel-shrink': {
    fontSize: '14px',
  },
};
