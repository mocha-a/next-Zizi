import React from 'react';
import TextField from '@mui/material/TextField';
import PasswordField from './PasswordField';
import GenderSelect from '../auth/GenderSelect';
import SecurityQuestionSelect from '../auth/SecurityQuestionSelect';

type FieldData = {
  label?: string;
  type: string;
  placeholder?: string;
  required: boolean;
};

interface FormTextFieldsProps {
  listData: FieldData[];
  formData: Record<string, string>;
  errors: Record<string, string>;
  onChange: (type: string, value: string) => void;
}

export const FormTextFielFieldDatas = ({
  listData,
  formData,
  errors,
  onChange,
}: FormTextFieldsProps) => {
  return (
    <>
      {listData.map((item, i) => {
        if (item.type === 'gender') {
          return (
            <div className="join-gender-box" key={i}>
              <p>성별</p>

              <GenderSelect
                value={formData.gender}
                onChange={(value) => {
                  if (value !== null) {
                    onChange('gender', value);
                  }
                }}
                className="join-tagbtn"
              />
            </div>
          );
        }

        if (item.type === 'securityQuestion') {
          return (
            <SecurityQuestionSelect
              key={i}
              value={formData.securityQuestion}
              onChange={(value) => onChange('securityQuestion', value)}
            />
          );
        }

        if (item.type.includes('password')) {
          return (
            <PasswordField
              key={i}
              label={item.label}
              placeholder={item.placeholder}
              className="textfield"
              value={formData[item.type] || ''}
              error={errors[item.type]}
              required={item.required}
              onChange={(value) => onChange(item.type, value)}
            />
          );
        }

        return (
          <TextField
            key={i}
            label={item.label}
            type={item.type}
            placeholder={item.placeholder}
            required={item.required}
            variant="standard"
            className="textfield"
            value={formData[item.type] || ''}
            onChange={(e) => onChange(item.type, e.target.value)}
            error={!!errors[item.type]}
            helperText={errors[item.type]}
          />
        );
      })}
    </>
  );
};
