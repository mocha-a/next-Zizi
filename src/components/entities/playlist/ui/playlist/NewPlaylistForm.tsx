'use client';
import React from 'react';
import TextField from '@mui/material/TextField';
import Back from '@/components/icons/Back';

interface Props {
  name: string;
  description: string;
  isPending: boolean;
  onChangeName: (v: string) => void;
  onChangeDescription: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const NewPlaylistForm = ({ name, description, isPending, onChangeName, onChangeDescription, onSubmit, onBack }: Props) => {
  return (
    <form className='new-playlist-form' onSubmit={onSubmit}>
      <div className="new-playlist-header">
        <div className='new-playlist-back'>
          <Back onBack={onBack} />
        </div>
        <p className='sub-title'>내 플리 만들기</p>
        <button disabled={isPending} className='submit' type="submit">
          {isPending ? '저장 중...' : '저장'}
        </button>
      </div>

      <TextField
        label="플리 이름"
        value={name}
        onChange={(e) => onChangeName(e.target.value)}
        variant="standard"
        className='textfield'
        placeholder='>>> waiting for title... 제목을 입력해줘'
        required
        fullWidth
      />

      <TextField
        label="설명"
        value={description}
        onChange={(e) => onChangeDescription(e.target.value)}
        variant="standard"
        className='textfield'
        placeholder='>>> describe your vibe... 어떤 기분으로 모았어?'
        fullWidth
      />
    </form>
  );
};

export default NewPlaylistForm;