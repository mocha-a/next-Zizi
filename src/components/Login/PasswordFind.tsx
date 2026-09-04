'use client'

import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { verifyPassword, resetPassword } from '@/lib/api/user'
import { validate } from '@/lib/validation';
import { useSnackbarStore } from '@/store/useSnackbarStore';
import SecurityQuestionSelect from '../auth/SecurityQuestionSelect'
import LongBtn from '../common/LongBtn'
import PasswordField from '../common/PasswordField'

interface Props {
  setPasswordFindStep: React.Dispatch<
    React.SetStateAction<'verify' | 'reset'>
  >;
  onClose: () => void;
}

function PasswordFind({ setPasswordFindStep, onClose }: Props) {
  const show = useSnackbarStore(state => state.show);
  const [step, setStep] = useState<'verify' | 'reset'>('verify')
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    id: '',
    securityQuestion: '',
    answer: '',
    password: '',
    passwordConfirm: '',
  })

  const handleChange = (
    type: string,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [type]: value,
    }))
  }

  const handleBlur = (
    type: string,
    value: string
  ) => {
    const errorMsg = validate(
      type === 'passwordConfirm' ? 'password-check' : type,
      value,
      formData.password
    )

    setErrors(prev => ({
      ...prev,
      [type]: errorMsg,
    }))

    // 비밀번호 확인 값이 이미 있다면 비밀번호 변경 시 다시 검사
    if (type === 'password' && formData.passwordConfirm) {
      const checkError = validate(
        'password-check',
        formData.passwordConfirm,
        value
      )

      setErrors(prev => ({
        ...prev,
        passwordConfirm: checkError,
      }))
    }
  }

  // 일치하는 회원 찾기
  const handleVerify = async () => {
    try {
      const data = await verifyPassword({
        username: formData.id,
        securityQuestion: formData.securityQuestion,
        securityAnswer: formData.answer,
      });

      if (data.success) {
        setStep('reset');
        setPasswordFindStep('reset');
      }
    } catch (error) {
        console.error('비밀번호 찾기 본인 확인 에러:', error);

        show('일치하는 zi존이가 없어 இᯅஇ');
    }
  };

  // 비밀번호 재설정
  const handleReset = async () => {
    if (formData.password !== formData.passwordConfirm) {
      show('비밀번호가 일치하지 않아 ಇᯅஇ');
      return;
    }

    try {
      const data = await resetPassword({
        username: formData.id,
        newPassword: formData.password,
      });

      if (data.success) {
        show('비밀번호가 변경되었어! ✨');

        // 이후 로그인 화면으로 이동
        setPasswordFindStep('verify');
        onClose();
      }
    } catch (error) {
      console.error('비밀번호 변경 에러:', error);
      show('비밀번호 변경에 실패했어 ಇᯅஇ');
    }
  }

  // 본인 확인 단계 유효성
  const isValid =
    formData.id.trim() !== '' &&
    formData.securityQuestion !== '' &&
    formData.answer.trim() !== ''

  //비밀번호 재설정 단계 유효성 
    const isResetValid =
    formData.password !== '' &&
    formData.passwordConfirm !== '' &&
    !errors.password &&
    !errors.passwordConfirm

  return (
    <Box className="password-find">
      {step === 'verify' ? (
        <>
          <TextField
            label="아이디"
            placeholder="아이디를 입력해줘"
            className="textfield"
            variant="standard"
            value={formData.id}
            onChange={(e) =>
              handleChange('id', e.target.value)
            }
          />

          <SecurityQuestionSelect
            value={formData.securityQuestion}
            onChange={(value) =>
              handleChange('securityQuestion', value)
            }
          />

          <TextField
            label="답변"
            placeholder="답변을 입력해줘"
            className="textfield"
            variant="standard"
            value={formData.answer}
            onChange={(e) =>
              handleChange('answer', e.target.value)
            }
          />

          <LongBtn
            label="확인"
            className={`login ${isValid ? 'active' : ''}`}
            onClick={handleVerify}
            disabled={!isValid}
          />
        </>
      ) : (
        <>
          <PasswordField
            label="새 비밀번호"
            className="textfield"
            value={formData.password}
            error={errors.password}
            onChange={(value) => handleChange('password', value)}
            onBlur={() => handleBlur('password', formData.password)}
          />

          <PasswordField
            label="새 비밀번호 확인"
            className="textfield"
            value={formData.passwordConfirm}
            error={errors.passwordConfirm}
            onChange={(value) => handleChange('passwordConfirm', value)}
            onBlur={() => handleBlur('passwordConfirm', formData.passwordConfirm)}
          />

          <LongBtn
            label="비밀번호 변경"
            className={`login ${isResetValid ? 'active' : ''}`}
            onClick={handleReset}
            disabled={!isResetValid}
          />
        </>
      )}
    </Box>
  )
}

export default PasswordFind