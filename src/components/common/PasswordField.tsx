'use client';

import { useState } from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import EyeOff from '../icons/EyeOff';
import Eye from '../icons/Eye';

interface Props {
  label?: string;
  value: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const PasswordField = ({ label, value, error, required, placeholder, className, onChange, onBlur }: Props) => {
  const [showPw, setShowPw] = useState(false);

  return (
    <TextField
      className={className}
      placeholder={placeholder}
      label={label}
      type={showPw ? 'text' : 'password'}
      value={value}
      required={required}
      variant="standard"
      error={!!error}
      helperText={error}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      slotProps={{
        input: { //(input)의 (position="end" = 끝)에 (endAdornment = 추가요소)를 넣어줘
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setShowPw(prev => !prev)}
                edge="end"
                sx={{
                  p: 1,
                  fontSize: 0,
                  marginRight: 0,
                  color: '#058CD7',
                  '&:hover, &:active, &:focus': {
                    backgroundColor: '#E9F7FF',
                  },
                }}
              >
                {showPw ? <Eye /> : <EyeOff />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default PasswordField