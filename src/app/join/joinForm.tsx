'use client';

import React, { useEffect, useState } from 'react'
import { FormTextFielFieldDatas } from '@/components/common/FormTextFields'
import LongBtn from '@/components/common/LongBtn';
import Agree from '@/components/join/Agree';
import { JoinField } from '@/types/join';

function JoinForm({ listData }: { listData: JoinField[] }) {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isAgree, setIsAgree] = useState(false); // 약관 동의
    const [isComplete, setIsComplete] = useState<boolean>(false); // 버튼 활성화

    // 모든 조건이 충족되었는지 감시
    useEffect(() => {
        // 1. 필수 항목들이 모두 입력되었고 에러가 없는지 확인
        const requiredFields = listData.filter(f => f.required);
        const allInputsFilled = requiredFields.every(f => 
            formData[f.type] && formData[f.type].trim() !== '' && !errors[f.type]
        );

        // 2. 성별이 필수라면 성별 체크 (선택사항이면 제외)
        // 3. 약관 동의(isAgree)가 되었는지 확인
        setIsComplete(allInputsFilled && isAgree);
    }, [formData, errors, isAgree, listData]);
    
    // 유효성 검사
    const validate = (type: string, value: string, originalPassword?: string) => {
        let error = "";

        switch (type) {
            case 'id':
                const idReg = /^[a-zA-Z0-9]{4,16}$/;
                if (!idReg.test(value)) error = "영문•숫자를 조합하여 4~16자로 입력해주세요.";
                break;

            case 'password':
                const pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
                if (!pwReg.test(value)) error = "영문/숫자/특수문자를 모두 포함하여 8자 이상 입력해주세요.";
                break;

            case 'password-check':
                // formdata['password']와 현재 입력값(value) 비교
                if (value !== originalPassword) error = "비밀번호가 일치하지 않습니다.";
                break;

            case 'email':
                const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailReg.test(value)) error = "올바른 이메일 형식이 아닙니다.";
                break;
        }

        return error;
    };

    const handleFormChange = (type: string, value: string) => {
        // formdata에 { id: 'user1', email: 'test@..' } 형태로 저장.
        const newFormData = { ...formData, [type]: value };
        setFormData(newFormData);

        // 유효성 검사 로직
        const errorMsg = validate(type, value, newFormData['password']);
        setErrors(prev => ({ ...prev, [type]: errorMsg }));

        // 비밀번호 수정 시 '비밀번호 확인' 필드 재검증
        if (type === 'password' && newFormData['password-check']) {
            const checkError = validate('password-check', newFormData['password-check'], value);
            setErrors(prev => ({ ...prev, ['password-check']: checkError }));
        }
    };

    const handleSubmit = async () => {
        if (!isComplete) return;
        console.log("입력 데이터:", formData);

        // DB 저장
        // const res = await fetch('/api/auth/join', {
        //     method: 'POST',
        //     body: JSON.stringify(formData)
        // });
    }

    if (!listData) return;

  return (
    <div className='join-content-box'>
        <FormTextFielFieldDatas 
            listData={listData}
            formData={formData}
            errors={errors}
            onChange={handleFormChange}
        />

        <span className='info'>*표시는 필수 입력 항목입니다.</span>

        <Agree isAgree={isAgree} onAgreeChange={() => setIsAgree(!isAgree)}/>

        <LongBtn 
            label='회원가입' 
            className={`join ${isComplete ? 'active' : ''}`}
            onClick={handleSubmit}
        />
    </div>
  )
}

export default JoinForm