'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/axios';
import ShortBtn from '../common/ShortBtn';
import GenderSelect from './GenderSelect';

export default function OnboardingPopup() {
  const [ birth, setBirth ] = useState('');
  const [ gender, setGender ] = useState<string | null>(null);
  const [ nickname, setNickname ] = useState('');

  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { birth: string; gender: string; nickname: string }) =>
      api.put('/user/profile', data),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      router.push('/');
    },
  });

  const handleSubmit = () => {
    if (mutation.isPending) return;
    
    if (!birth || !gender || !nickname) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    mutation.mutate({ birth, gender, nickname });
  };

  return (
    <div className='onboarding_overlay'>
      <div className='onboarding_contents'>
        <p className='onboarding_icon'>꒰ 🎧 ꒱</p>
        <h2>Zi존이가 되기 위한 <br />Bonus 코스</h2>
        <span>
          작은 데이터들을 모아 나를 표현해봐 - !&nbsp; .❛ ᴗ ❛.
        </span>

        <label className='onboarding_nickname'>
          닉네임
          <input
            type="text"
            value={nickname}
            placeholder="ex) ★CutiE_GiRl★"
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>

        <label className='onboarding_birth'>
          생년월일
          <input
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </label>

        <div className="onboarding_gender">
          <span>성별</span>
          <GenderSelect value={gender} onChange={setGender}/>
        </div>
        {/* <label className='onboarding_gender'>
          성별
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as any)}
          >
            <option value="">선택</option>
            <option value="여성">여성</option>
            <option value="남성">남성</option>
          </select>
        </label> */}

        <div className='onboarding_buttons'>
          <ShortBtn label="다음에 할게요" active={false} onClick={() => { router.push('/'); }}/>
          <ShortBtn 
            label={mutation.isPending ? '저장 중...' : '완료'}
            active={true} onClick={handleSubmit}
          />
        </div>

      </div>
    </div>
  );
}
