'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { FormTextFielFieldDatas } from '@/components/common/FormTextFields'
import LongBtn from '@/components/common/LongBtn'
import LoginButtons from '@/components/Login/LoginButton'

import '../../styles/login/login.scss'
import BottomDialog from '@/components/common/Dialog';
import PasswordFind from '@/components/Login/PasswordFind';

function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [passwordFindOpen, setPasswordFindOpen] = useState(false)
  const [passwordFindStep, setPasswordFindStep] = useState<'verify' | 'reset'>('verify');
  const [errors] = useState<Record<string, string>>({})

  const handleChange = (type: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: value
    }))
  }
  const isValid = !!formData.id && !!formData.password;

  const handleLogin = async () => {
    if (!isValid) return;

    const result = await signIn('credentials', {
      username: formData.id,
      password: formData.password,
      redirect: false,
    });

    if (result?.error) {
      console.log('로그인 실패');
      return;
    }

    router.push('/');
  };

  const data = [
    {
      label: '아이디',
      type: 'id',
      placeholder: '아이디를 입력해주세요.',
      required: false
    },
    {
      label: '비밀번호',
      type: 'password',
      placeholder: '비밀번호를 입력해주세요.',
      required: false
    }
  ]

  return (
    <div className='login-container'>
      {/* 로고 */}
      <div className='login-logo'>
        <span>너의 리듬, 너의 휴식</span>
        <div className='header'>Zizi !</div>
      </div>

      {/* 입력창 */}
      <FormTextFielFieldDatas
        listData={data}
        formData={formData}
        errors={errors}
        onChange={handleChange}
      />

      {/* 로그인 버튼 */}
      <LongBtn
        label="로그인"
        className={`login ${isValid ? 'active' : ''}`}
        onClick={handleLogin}
        disabled={!isValid}
      />

      {/* 회원가입 / 비밀번호 찾기 */}
      <div className="login-link-container">
        <Link href="/join" className="login-join-btn">
            회원가입
        </Link>

        <span className="login-link-divider">|</span>

        <button
          className="password-find-btn"
          onClick={() => setPasswordFindOpen(true)}
        >
          비밀번호 찾기
        </button>
      </div>

      {/* 소셜 로그인 */}
      <div className='login-social-container'>
        <span>소셜 로그인</span>
        <LoginButtons />
      </div>

      {/* 비밀번호 찾기 */}
      <BottomDialog
        open={passwordFindOpen}
        onClose={() => setPasswordFindOpen(false)}
        title={
          passwordFindStep === 'verify'
            ? '비밀번호 찾기'
            : '새 비밀번호 설정'
        }
      >
        <PasswordFind
          setPasswordFindStep={setPasswordFindStep}
          onClose={() => setPasswordFindOpen(false)}
        />
      </BottomDialog>
    </div>
  )
}

export default Page