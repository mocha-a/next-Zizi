import React from 'react'
import Back from '@/components/icons/Back'
import JoinForm from './joinForm';

import '../../styles/join/join.scss'

function page() {
    const data = [
        {
            label: '이름',
            type: 'name',
            placeholder: '예) 김지지',
            required: true
        },
        {
            label: '아이디',
            type: 'id',
            placeholder: '영문•숫자 조합해 4~16자 입력',
            required: true
        },
        {
            label: '이메일',
            type: 'email',
            placeholder: '예) zizi@gmail.com',
            required: true
        },
        {
            label: '비밀번호',
            type: 'password',
            placeholder: '영문•숫자•특수문자 모두 포함해 8자 이상 입력',
            required: true
        },
        {
            label: '비밀번호 확인',
            type: 'password-check',
            required: true
        },
        {
            type: 'date',
            placeholder: '달력을 통해 생년월일을 입력해주세요.',
            required: false
        },
        {
            label: '성별',
            type: 'gender',
            required: false
        },
    ];
    
  return (
    <div className='join-container'>
        <Back className='join'/>

        <p className='join-title'>회원가입</p>

        <JoinForm listData={data}/>
    </div>
  )
}

export default page