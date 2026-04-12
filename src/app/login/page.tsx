'use client'
import React, { useState } from 'react'
import { FormTextFielFieldDatas } from '@/components/common/FormTextFields'
import LongBtn from '@/components/common/LongBtn'
import Link from 'next/link'
import LoginButtons from '@/components/Login/LoginButton'

import '../../styles/login/login.scss'

function Page() {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors] = useState<Record<string, string>>({})

  const handleChange = (type: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: value
    }))
  }

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
      <LongBtn label={'로그인'} className='login' />

      {/* 회원가입 버튼 */}
      <Link href="/join">
        <button className='login-join-btn'>회원가입</button>
      </Link>

      {/* 소셜 로그인 */}
      <div className='login-social-container'>
        <span>소셜 로그인</span>
        <LoginButtons />
      </div>
    </div>
  )
}

export default Page