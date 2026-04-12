'use client';

import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import TagBtn from './TagBtn';

type Gender = '남성' | '여성' | '기타';
const GENDER_OPTIONS: Gender[] = ['남성', '여성', '기타'];

type FieldData = {
  label?: string,
  type: string,
  placeholder?: string,
  required: boolean
}

interface FormTextFieldsProps {
  listData: FieldData[];
  formData: Record<string, string>; // 부모의 상태를 받음
  errors: Record<string, string>;   // 부모의 에러 상태를 받음
  onChange: (type: string, value: string) => void;
}


export const FormTextFielFieldDatas = ({ 
  listData, formData, errors, onChange
}: FormTextFieldsProps) => {

  const [showPw/* , setShowPw */] = useState(false);

  return (
    <>
      {listData.map((item, i) => 
        item.type === 'gender' ? (
          <div className='join-gender-box' key={i}>
            <p>성별</p>
            {GENDER_OPTIONS.map(g => 
              <TagBtn 
                key={g} tagbtn={g} 
                className={`join-tagbtn ${formData.gender === g ? 'active' : ''}`}
                onClick={() => onChange('gender', g)}
              />
            )}
          </div>
        ) : (
          <TextField
            key={i}
            label={item.label}
            type={item.type.includes('password') ? (showPw ? 'text' : 'password') : item.type}
            placeholder={item.placeholder}
            required={item.required}
            variant="standard"
            className='textfield'
            value={formData[item.type] || ''} // 부모가 실제 관리하는 값 -> ?
            onChange={(e) => onChange(item.type, e.target.value)}

            // 에러 처리
            error={!!errors[item.type]}
            helperText={errors[item.type]}

            // 비밀번호 눈 아이콘
            // InputProps={item.type.includes('password') ? {
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
            //         {showPw ? <VisibilityOff /> : <Visibility />}
            //       </IconButton>
            //     </InputAdornment>
            //   ),
            // } : undefined}
          />
        )
      )}
    </>
  )
}
