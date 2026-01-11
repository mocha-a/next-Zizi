'use client';

import { useState } from 'react';
import ShortBtn from '../common/ShortBtn';
import GenderSelect from './GenderSelect';

export default function OnboardingPopup() {
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!birth || !gender) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    setLoading(true);

    await fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        birth,
        gender, 
      }),
    });

    setLoading(false);
    window.location.reload(); // 세션 다시 불러오게 (제일 단순한 방법)
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
          <ShortBtn label="다음에 할게요" active={false} onClick={()=>{ setLoading(false) }}/>
          <ShortBtn 
            label={loading ? '저장 중...' : '완료'}
            active={true} onClick={handleSubmit}
          />
        </div>

      </div>
    </div>
  );
}
