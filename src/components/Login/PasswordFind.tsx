'use client'

import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { verifyPassword } from '@/lib/api/user'
import { useSnackbarStore } from '@/store/useSnackbarStore';
import SecurityQuestionSelect from '../auth/SecurityQuestionSelect'
import LongBtn from '../common/LongBtn'
import PasswordField from '../common/PasswordField'

interface Props {
  setPasswordFindStep: React.Dispatch<
    React.SetStateAction<'verify' | 'reset'>
  >;
}

function PasswordFind({ setPasswordFindStep }: Props) {
  const show = useSnackbarStore(state => state.show);
  const [step, setStep] = useState<'verify' | 'reset'>('verify')

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
    setFormData((prev) => ({
      ...prev,
      [type]: value,
    }))
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

  const handleReset = () => {
    // 나중에 API 연결
    console.log('비밀번호 변경', formData)
  }

  const isValid =
    formData.id.trim() !== '' &&
    formData.securityQuestion !== '' &&
    formData.answer.trim() !== ''

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
            onChange={(value) => handleChange('password', value)}
          />

          <PasswordField
            label="새 비밀번호 확인"
            className="textfield"
            value={formData.passwordConfirm}
            onChange={(value) => handleChange('passwordConfirm', value)}
          />

          <LongBtn
            label="비밀번호 변경"
            className={`login ${isValid ? 'active' : ''}`}
            onClick={handleReset}
            disabled={!isValid}
          />
        </>
      )}
    </Box>
  )
}

export default PasswordFind