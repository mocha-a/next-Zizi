'use client';

import React, { useState } from 'react'
import { FormTextFielFieldDatas } from '@/components/common/FormTextFields'
import LongBtn from '@/components/common/LongBtn';
import Agree from '@/components/join/Agree';


function JoinForm({ listData }: { listData: any[] }) {
    const [formData, setFormData] = useState({
        textFields: {} as Record<string, string>,
        gender: '' as '남' | '여' | '기타' | '',
    });
    const [isComplete, setIsComplete] = useState<boolean>(false);
    
    // FormTextFielFieldDatas에서 값이 바뀔 때마다 호출
    const handleFormChange = (data: typeof formData) => {
        setFormData(data);

        // 필수 항목 완료 여부 확인
        const requiredFields = listData.filter(f => f.required).map(f => f.label);
        const complete = requiredFields.every(
        key =>
            (key === '성별'
            ? data.gender !== ''
            : data.textFields[key] && data.textFields[key] !== '')
        );
        setIsComplete(complete);
    };

    if (!listData) return;

  return (
    <div className='join-content-box'>
        <FormTextFielFieldDatas listData={listData}/>

        <span className='info'>*표시는 필수 입력 항목입니다.</span>

        <Agree isComplete={isComplete}/>

        <LongBtn longbtn='회원가입' className='join'/>
    </div>
  )
}

export default JoinForm