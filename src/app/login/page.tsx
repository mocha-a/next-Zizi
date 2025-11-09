import React from 'react'
import Image from 'next/image';
import { FormTextFielFieldDatas } from '@/components/common/FormTextFields'

import '../../styles/login/login.scss';
import LongBtn from '@/components/common/LongBtn';
import Link from 'next/link';

function page() {
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
        <FormTextFielFieldDatas listData={data}/>

        {/* 로그인 버튼 */}
        <LongBtn longbtn={'로그인'} className='login'/>

        {/* 회원가입 버튼 */}
        <Link href="/join">
            <button className='login-join-btn'>회원가입</button>
        </Link>

        {/* 소셜 로그인 */}
        <div className='login-social-container'>
            <span>소셜 로그인</span>
            <div className='login-social-icons'>
                <Image
                    src={'/imgs/login_google.png'}
                    alt='login-google'
                    width={60}
                    height={60}
                />
                <Image
                    src={'/imgs/login_naver.png'}
                    alt='login-naver'
                    width={60}
                    height={60}
                />
                <Image
                    src={'/imgs/login_kakao.png'}
                    alt='login-kakao'
                    width={60}
                    height={60}
                />
            </div>
        </div>

    </div>
  )
}

export default page