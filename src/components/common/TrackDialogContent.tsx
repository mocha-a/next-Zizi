'use client';

import { Track } from "@/types/deezer/deezer";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { MyPlaylist } from "@/types/user/myPlaylist";
import { useQuery } from "@tanstack/react-query";
import { getPlaylists, updatePlaylist } from "@/lib/api/myPlaylist";
import Back from "../icons/Back";
import Plus from "../icons/Plus";
import TagBtn from "./TagBtn";
import PlaylistSwiplerinDialog from "./PlaylistSwiperinDialog";
import TextField from "@mui/material/TextField";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import Popup from "./Popup";
import AddPlaylistButton from "./AddPlaylistButton";
import { useTrackStore } from "@/store/useSelectedTrackStore";
import { useTrackDialog } from "@/store/useTrackDialog";

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
  const [showSelectPopup, setShowSelectPopup] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const addSong = usePlaylistStore(state => state.addSong);
  const setTitle = useTrackStore(state => state.setTitle);
  const toggleSelect = useTrackStore((state) => state.toggleSelect);
  const addSelectedToPlaylist = useTrackStore((state) => state.addSelectedToPlaylist);

  const closeDialog = useTrackDialog((s) => s.closeDialog);
  
  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = useSession();
  const { data: user } = useUserProfile(session);

  const handleYouTubeSearch = () => {
    const query = `${trackData.artist.name} ${trackData.title_short}`;
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleStep1to2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!session) {
      e.preventDefault();
      setShowLoginPopup(true);
      return;
    }

    setStep('add');
  };

  const handleSelectTrack = () => {
    if (step === 'new') {
      setTitle(newPlaylistName);
      
      toggleSelect(trackData); 

      addSelectedToPlaylist();

      closeDialog();

      router.push('/myplaylist/new');
    };
    
    // 확인 필요
    if (step === 'add') {
      if (!selectedPlaylistId) {
        setShowSelectPopup(true);
        return;
      }
      addSong(trackData);

      // toggleSelect(trackData); 

      // addSelectedToPlaylist();

      closeDialog();

      router.push(`/myplaylist/${selectedPlaylistId}/edit`);
    };


    // console.log(newPlaylistName);
    // console.log(trackData);
  };

  const { data: playlistsOfUser } = useQuery<MyPlaylist[]>({
    queryKey: ['myplaylist', user?.id],
    queryFn: () => getPlaylists(),
    enabled: !!user?.id,
    staleTime: 0,
  });

  console.log(selectedPlaylistId);
  
  
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
          <button onClick={handleStep1to2}>
            내 플레이리스트에 담기
          </button>
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
            {/* <AddPlaylistButton onClick={handleSelectTrack} /> */}
            <button className="new-btn-in-dialog" onClick={() => setStep('new')}>
              새 플레이리스트
            </button>
          </div>
          <p className="og-txt-in-dialog">
            {user?.nickname ? user.nickname : user?.name} 님이 생성한 플리에요 !
          </p>
          <PlaylistSwiplerinDialog 
            myListItem={playlistsOfUser}
            selectedId={selectedPlaylistId}
            onSelect={setSelectedPlaylistId}/>
          <div className="complete-btn-box-in-dialog">
            <TagBtn tagbtn="선택" className="complete-btn-in-dialog" onClick={() => handleSelectTrack()}/>
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
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            variant="standard"
            placeholder='>>> waiting for title... 제목을 입력해줘'
            required
            fullWidth
            sx={inputStyle}
          />
          <div className="complete-btn-box-in-dialog">
            <TagBtn tagbtn="완료" className="complete-btn-in-dialog" onClick={() => handleSelectTrack()}/>
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

      {showSelectPopup && (
        <Popup
          type="noSelect"
          onClose={() => setShowSelectPopup(false)}
          onConfirm={() => console.log('ok')}
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
