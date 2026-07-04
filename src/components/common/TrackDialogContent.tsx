'use client';

import { Track } from "@/types/deezer/deezer";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { MyPlaylist, UpdatePlaylistParams } from "@/types/user/myPlaylist";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPlaylists, updatePlaylist } from "@/lib/api/myPlaylist";
import Back from "../icons/Back";
import Plus from "../icons/Plus";
import TagBtn from "./TagBtn";
import PlaylistSwiplerinDialog from "./PlaylistSwiperinDialog";
import TextField from "@mui/material/TextField";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import Popup from "./Popup";
import { useTrackStore } from "@/store/useSelectedTrackStore";
import { useTrackDialog } from "@/store/useTrackDialog";
import { useSnackbarStore } from "@/store/useSnackbarStore";
import { queryClient } from "@/lib/react-query/queryClient";

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
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const show = useSnackbarStore(state => state.show);
  // const addSong = usePlaylistStore(state => state.addSong);
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

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: UpdatePlaylistParams) =>
      updatePlaylist(id, data),

    onSuccess: async (_, variables) => {
      show('내 플리에 추가 완료 - !');
      const id = Number(variables.id);

      await queryClient.invalidateQueries({
        queryKey: ['myplaylist', user?.id] // user 전체 플리 목록 갱신
      });
      await queryClient.invalidateQueries({
        queryKey: ['myplaylist', id]
      });
      await queryClient.invalidateQueries({
        queryKey: ['playlistTracks', id]
      });
    },
    onError: () => {
      show('⚠️ 추가 중 오류 발생 ! ㅜㅜ');
    }
  });

  const handleSelectTrack = () => {

    // 새 플레이리스트에 추가
    if (step === 'new') {
      setTitle(newPlaylistName);
      toggleSelect(trackData); 
      addSelectedToPlaylist();
      closeDialog();
      router.push('/myplaylist/new');
      return;
    };
    
    // 기존 플레이리스트에 추가 (서버에 바로 저장)
    if (step === 'add') {
      if (!selectedPlaylistId) {
        show('⚠️ 원하는 플리를 선택해주세요 !');
        return;
      }
      
      // 현재 사용자가 선택한 플레이리스트의 상세 데이터 찾기
      const targetId = Number(selectedPlaylistId);
      const targetPlaylist = playlistsOfUser?.find(pl => Number(pl.id) === targetId);

      if (!targetPlaylist) {
        show('⚠️ 선택하신 플리를 찾을 수 없어요 !');
        return;
      }

      // 기존 플리 곡 id 목록 추출
      const existingTrackIds = (targetPlaylist.tracks || []).map((track: any) => ({
        id: Number(track.trackId),
      }));

      // 현재 선택한 track
      const currentTrackId = Number(trackData.id);

      // 중복 검사
      const isDuplicate = existingTrackIds.some((track: any) => track.id === currentTrackId);
      if (isDuplicate) {
        show('⚠️ 이미 플레이리스트에 있는 곡입니다!');
        closeDialog();
        return;
      }

      // 기존 곡 목록에 선택한 곡 추가
      const updatedTracks = [...existingTrackIds, { id: currentTrackId }];

      // 썸네일
      const updatedThumbnails = [...targetPlaylist.thumbnails, trackData.album.cover_medium];

      // 서버에 보낼 Payload 구성
      const payload = {
        title: targetPlaylist.title,
        description: targetPlaylist.description,
        thumbnails: updatedThumbnails,
        tracks: updatedTracks,
      };

      // 서버 mutation 실행
      updateMutation.mutate({
        id: targetId,
        data: payload,
      })

      closeDialog();
    };
  };

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
