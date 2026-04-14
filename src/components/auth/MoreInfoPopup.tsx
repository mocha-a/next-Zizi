'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/axios';
import ShortBtn from '../common/ShortBtn';
import GenderSelect from './GenderSelect';

export default function OnboardingPopup() {
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState<string | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { birth: string; gender: string }) =>
      api.put('/api/user/profile', data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      router.push('/');
    },
  });

  const handleSubmit = () => {
    if (!birth || !gender) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    mutation.mutate({ birth, gender });
  };

  return (
    <div className='onboarding_overlay'>
      <div className='onboarding_contents'>
        <p className='onboarding_icon'>🎧</p>
        <h2>나만의 음악을 만나볼까요?</h2>
        <span>
          간단한 정보만 입력하면<br />
          취향에 딱 맞는 음악을 추천해 드려요&nbsp; .❛ ᴗ ❛.
        </span>

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
