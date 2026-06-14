'use client';

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import { useMutation } from '@tanstack/react-query';
import { JoinField } from '@/types/join';
import { checkDuplicate, join } from '@/lib/api/user';
import { FormTextFielFieldDatas } from '@/components/common/FormTextFields'
import LongBtn from '@/components/common/LongBtn';
import Agree from '@/components/join/Agree';

function JoinForm({ listData }: { listData: JoinField[] }) {
  const router = useRouter();
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAgree, setIsAgree] = useState(false); // 약관 동의
  const [isComplete, setIsComplete] = useState<boolean>(false); // 버튼 활성화

  // 모든 조건이 충족되었는지 감시
  useEffect(() => {
    // 필수 항목들이 모두 입력되었고 에러가 없는지 확인
    const requiredFields = listData.filter(f => f.required);
    const allInputsFilled = requiredFields.every(f => 
        formData[f.type] && formData[f.type].trim() !== '' && !errors[f.type]
    );

    // 성별이 필수라면 성별 체크 (선택사항이면 제외)
    // 약관 동의(isAgree)가 되었는지 확인
    const allValid =
      allInputsFilled &&
      isAgree;

    setIsComplete(allValid);

  }, [formData, errors, isAgree, listData]);
  
  // 유효성 검사
  const validate = (type: string, value: string, originalPassword?: string) => {
    let error = "";

    switch (type) {
      case 'username':
        const idReg = /^[a-zA-Z0-9]{4,16}$/;
        if (!idReg.test(value)) error = "✨ 영문 · 숫자를 조합해 4~16자로 입력해줘";
        break;

      case 'password':
        const pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
        if (!pwReg.test(value)) error = "🔒 영문 · 숫자 · 특수문자를 포함해 8자 이상 입력해줘";
        break;

      case 'password-check':
        // formdata['password']와 현재 입력값(value) 비교
        if (value !== originalPassword) error = "🔑 비밀번호를 한 번 더 확인해줘";
        break;

      case 'email':
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailReg.test(value)) error = "📧 이메일 형식으로 입력해줘";
        break;
    }

    return error;
  };

  const handleFormChange = (type: string, value: string) => {
      if (type === 'email') {
        setEmailChecked(false);
        setEmailAvailable(null);
      }

      // 아이디, 이메일은 공백 제거
      if (type === 'username' || type === 'email') {
          value = value.replace(/\s/g, '');
      }

      // 아이디 영어+숫자만 허용
      if (type === 'username') {
        value = value.replace(/[^a-zA-Z0-9]/g, '');
      }

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

  const { mutate, isPending } = useMutation({
    mutationFn: join,

    onSuccess: async () => {
      const res = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/");
      }
    },

    onError: (error) => {
      console.error(error);
    }
  });

  const handleSubmit = async () => {
    if (!isComplete) return;

    try {
      const newErrors: Record<string, string> = {};

      const usernameCheck = await checkDuplicate(
        'username',
        formData.username
      );

      if (!usernameCheck.available) {
        newErrors.username = '이미 사용 중인 아이디야 !';
      }

      const emailCheck = await checkDuplicate(
        'email',
        formData.email
      );

      if (!emailCheck.available) {
        newErrors.email = '이미 사용 중인 이메일이야 !';
      }

      // 한 번에 반영
      if (Object.keys(newErrors).length > 0) {
        setErrors(prev => ({
          ...prev,
          ...newErrors,
        }));
        return;
      }

      // 3️⃣ 통과 → 회원가입
      mutate({
        name: formData.name,
        username: formData.username,
        password: formData.password,
        email: formData.email,
        nickname: formData.nickname,
        birth: formData.birth,
        gender: formData.gender,
      });

    } catch (err) {
      console.error(err);
    }
  };

  if (!listData) return;

  return (
    <div className='join-content-box'>
      <FormTextFielFieldDatas 
        listData={listData}
        formData={formData}
        errors={errors}
        onChange={handleFormChange}
      />

      <span className='info'>* 표시는 필수 입력 항목입니다.</span>

      <Agree isAgree={isAgree} onAgreeChange={() => setIsAgree(!isAgree)}/>

      <LongBtn
        label={isPending ? '가입 중...' : '회원가입'}
        className={`join ${isComplete && !isPending ? 'active' : ''}`}
        onClick={handleSubmit}
        disabled={!isComplete || isPending}
      />
    </div>
  )
}

export default JoinForm