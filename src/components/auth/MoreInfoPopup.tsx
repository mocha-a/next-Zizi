'use client';

import { useState } from 'react';
import TagBtn from '../common/TagBtn';

const GENDER_OPTIONS = [
  { label: '여성', value: 'female'},
  { label: '남성', value: 'male'},
  { label: '기타', value: 'etc'},
];

export default function OnboardingPopup() {
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState<'여성' | '남성' | ''>('');
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
        <h2>추가 정보 입력</h2>

        <label className='onboarding_birth'>
          생년월일
          <input
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </label>

        <div className='onboarding_gender'>
          {GENDER_OPTIONS.map((option, i) => (
            <div key={i}>
              {/* <TagBtn className={value === } tagbtn={option.label}/> */}
            </div>
          ))}
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
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? '저장 중...' : '완료'}
          </button>

          <button>
            다음에 할게요
          </button>
        </div>

      </div>
    </div>
  );
}
