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
}


export const FormTextFielFieldDatas = ({ listData }: FormTextFieldsProps) => {
  const [formState, setFormState] = useState({
    textFields: {} as Record<string, string>,
    gender: '' as Gender | '',
  });

  return (
    <>
        {listData.map((item, i) => 
          item.type === 'gender' ? (
            <div className='join-gender-box'>
              <p>성별</p>
              {
                GENDER_OPTIONS.map(g => 
                  <TagBtn key={g} tagbtn={g} className={`join-tagbtn ${formState.gender === g ? 'active' : ''}`}/>
              )}
            </div>
          ) : (
            <TextField
                key={i}
                label={item.label}
                type={item.type}
                placeholder={item.placeholder}
                required={item.required}
                variant="standard"
                className='textfield'
            />
          )
        )}
    </>
  )
}
