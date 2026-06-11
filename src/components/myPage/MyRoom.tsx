'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePlaylistEditStore } from '@/store/usePlaylistEditStore';
import { UserProfile } from '@/types/user/profile';
import { formatLastVisited, formatYYYYMMDD } from '@/lib/format';
import { api } from '@/lib/api/axios';
import GenderSelect from '../auth/GenderSelect';

interface Props {
  user: UserProfile | undefined;
}

const MyRoom = ({ user }: Props) => {
  const queryClient = useQueryClient();
  const { isEditMode, setEditMode } = usePlaylistEditStore();

  const [ nickname, setNickname ] = useState('');
  const [ birth, setBirth ] = useState('');
  const [ gender, setGender ] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    setNickname(user.nickname ?? '');
    setBirth(user.birth ?? '');
    setGender(user.gender ?? null);
  }, [user]);

  const mutation = useMutation({
    mutationFn: (data: {
      nickname: string;
      birth: string;
      gender: string;
    }) => api.put('/user/profile', data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userProfile'],
      });

      setEditMode(false);
    },
  });

  const handleEditMode = () => {
    if (!isEditMode) {
      setEditMode(true);
      return;
    }

    if (!nickname || !birth || !gender) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    mutation.mutate({
      nickname,
      birth,
      gender,
    });
  };

  return (
    <div className='myRoom-container'>
      {/* <OnboardingPopup /> */}
      <div className='myRoom-btn'>
        {!isEditMode ? (
          <div className='submit' onClick={() => setEditMode(true)}>
            편집
          </div>
        ) : (
          <div className='edit-actions'>
            {/* 취소 */}
            <button
              className='submit cancel-btn'
              onClick={() => {
                setEditMode(false);

                // rollback
                setNickname(user?.nickname ?? '');
                setBirth(user?.birth ?? '');
                setGender(user?.gender ?? null);
              }}
            >
              취소
            </button>

            {/* 완료 */}
            <button
              className='submit complete-btn'
              onClick={handleEditMode}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? '저장 중...' : '완료'}
            </button>
          </div>
        )}
      </div>

      <div className={`myRoom-profile ${isEditMode ? 'edit-mode' : ''}`}>
        <p>
          <Image
            src={user?.image || '/imgs/default.png'}
            alt="Profile Image"
            width={50}
            height={50}
          />
        </p>

        <div>
          <p className='myRoom-name'>{user?.name}</p>

          <div className='myRoom-lastVisited'>
            <p className='myRoom-label'>마지막 접속</p>
            <p className='myRoom-value'>
              {formatLastVisited(user?.lastVisitedAt)}
            </p>
          </div>
        </div>
      </div>

      <div className='myRoom-info'>
        <div className={`myRoom-item ${isEditMode ? 'edit-mode' : ''}`} >
          <p className='myRoom-label'>📧 이메일</p>
          <p className='myRoom-value'>{user?.email}</p>
        </div>

        <div className={`myRoom-item ${isEditMode ? 'edit-mode' : ''}`} >
          <p className='myRoom-label'>📅 가입일</p>
          <p className='myRoom-value'>
            {formatYYYYMMDD(user?.createdAt)}
          </p>
        </div>

        <div className='myRoom-item'>
          <p className='myRoom-label'>📛 닉네임</p>

          {isEditMode ? (
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          ) : (
            <p className='myRoom-value'>{user?.nickname}</p>
          )}
        </div>

        <div className='myRoom-item birth'>
          <p className='myRoom-label'>🎂 생년월일</p>

          {isEditMode ? (
            <input
              type='date'
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            />
          ) : (
            <p className='myRoom-value'>
              {formatYYYYMMDD(user?.birth ?? undefined)}
            </p>
          )}
        </div>

        <div className='myRoom-item onboarding_gender'>
          <p className='myRoom-label'>👤 성별</p>

          <GenderSelect
            value={isEditMode ? gender : user?.gender ?? null}
            onChange={setGender}
            readonly={!isEditMode}
            className={isEditMode ? 'editable' : 'readonly'}
          />
        </div>
      </div>
    </div>
  );
};

export default MyRoom;