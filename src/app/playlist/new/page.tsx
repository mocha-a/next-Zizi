'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Back from '@/components/icons/Back';
import TextField from '@mui/material/TextField';
import LongBtn from '@/components/common/LongBtn';

import '@/styles/playlist/NewPlaylist.scss';

const Page = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      name,
      description,
    });

    // TODO: 여기서 API 호출
  };

  return (
    <div className='new-playlist-page'>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '400px',
        }}
      >
        <div className="new-playlist-header">
          <Back />
          <p className='sub-title'>내 플리 만들기</p>
          <button type="submit">저장</button>
        </div>

        {/* 플레이리스트 이름 */}
        <TextField
          label="플리 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="standard"
          className='textfield'
          placeholder='>>> waiting for title... 제목을 입력해줘'
          required
          fullWidth
          sx={{
            '& .MuiInputBase-input::placeholder': {
              fontFamily: 'var(--font-Galmuri9)',
            },
          }}
        />

        {/* 설명 */}
        <TextField
          label="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="standard"
          className='textfield new'
          placeholder='>>> describe your vibe... 어떤 기분으로 모았어?'
          fullWidth
          sx={{
            '& .MuiInputBase-input::placeholder': {
              fontFamily: 'var(--font-Galmuri9)',
            },
          }}
        />

        {/* 곡 추가 버튼 */}
      </form>

      <LongBtn label={`+ 곡 추가하기`} className='active' onClick={() => router.push('/playlist/add-track')}/>
    </div>
  );
};

export default Page;