'use client';

import React from 'react'
import CheckSquareOn from '../icons/CheckSquareOn';
import CheckSquareOff from '../icons/CheckSquareOff';

interface Props {
    isComplete: boolean;
}

export default function Agree({ isComplete }: Props) {
  return (
    <div className='join-agree-box'>
        {isComplete ? <CheckSquareOn className='join'/> : <CheckSquareOff className='join'/>}
        <p>
            <button>이용약관</button> 및 <button>개인정보취급방침</button>에 모두 동의합니다. (필수)
        </p>
    </div>
  )
}