import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import TagBtn from '../common/TagBtn';
import Popup from '../common/Popup';

const MyPlaylistsSection = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [ showPopup, setShowPopup ] = useState(false);

  const handleClick = () => {
    // 로그인 안된 상태
    if (!session) {
      setShowPopup(true);
      return;
    }

    router.push('/playlist/new');
  };

  return (
    <div>
      <TagBtn tagbtn={`+ 플레이리스트 추가`} onClick={handleClick}/>
      {showPopup && 
        <Popup 
          showPopup={showPopup} 
          setShowPopup={setShowPopup} 
          type={"login"}  
          onConfirm={() => {
              router.push(`/login`)
              }}
          onCancel={()=>{
              router.back()
              setShowPopup(false)
          }}
        />
      }
    </div>
  )
}

export default MyPlaylistsSection