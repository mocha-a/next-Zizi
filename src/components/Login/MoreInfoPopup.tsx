'use client';

import { useState } from 'react';

export default function OnboardingPopup() {
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState<'female' | 'male' | ''>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!birth || !gender) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    setLoading(true);

    await fetch('/api/user/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ birth, gender }),
    });

    setLoading(false);
    window.location.reload(); // 세션 다시 불러오게 (제일 단순한 방법)
  };

  return (
    <div>
      <div>
        <h2>추가 정보 입력</h2>

        <label>
          생년월일
          <input
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </label>

        <label>
          성별
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as any)}
          >
            <option value="">선택</option>
            <option value="female">여성</option>
            <option value="male">남성</option>
          </select>
        </label>

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? '저장 중...' : '완료'}
        </button>
      </div>
    </div>
  );
}
