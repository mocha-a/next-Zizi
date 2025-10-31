import React from 'react'
import TextField from '@mui/material/TextField';

type FieldData = {
    label: string,
    type: string,
    placeholder: string,
    required: boolean
}

interface FormTextFieldsProps {
  listData: FieldData[];
}

export const FormTextFielFieldDatas = ({ listData }: FormTextFieldsProps) => {
  return (
    <>
        {listData.map((item, i) => (
            <TextField
                key={i}
                label={item.label}
                type={item.type}
                placeholder={item.placeholder}
                required={item.required}
                variant="standard"
                className='textfield'
            />
        ))}
    </>
  )
}
