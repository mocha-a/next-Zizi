'use client';

import React from 'react'
import CheckSquareOn from '../icons/CheckSquareOn';
import CheckSquareOff from '../icons/CheckSquareOff';

interface Props {
  isAgree: boolean;
  onAgreeChange: () => void;
}

export default function Agree({ isAgree, onAgreeChange }: Props) {
  return (
    <div className='join-agree-box' onClick={onAgreeChange}>
      {isAgree ? <CheckSquareOn className='join'/> : <CheckSquareOff className='join'/>}
      <p>
          <button>이용약관</button> 및 <button>개인정보취급방침</button>에 모두 동의합니다. (필수)
      </p>
    </div>
  )
}