import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { SECURITY_QUESTIONS } from '@/constants/securityQuestion';
import Drop from '../icons/Drop';

interface Props {
  value?: string;
  error?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

const SecurityQuestionSelect = ({ value, onChange }: Props) => {
  return (
    <TextField
      id="security-question"
      name="securityQuestion"
      select
      label="비밀번호 찾기 질문"
      variant="standard"
      className="textfield"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      sx={securityQuestionSx}
      slotProps={{
        select: {
          IconComponent: Drop,
          MenuProps: {
            PaperProps: {
              sx: {
                '& .MuiMenuItem-root': menuItemSx,
              },
            },
          },
        },
      }}
    >
      {SECURITY_QUESTIONS.map((question) => (
        <MenuItem key={question} value={question} >
          {question}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SecurityQuestionSelect;

const securityQuestionSx = {
  '& .MuiInputBase-input': {
    fontFamily: 'var(--font-gmarketMedium)',
    fontSize: '14px',
    padding: '10px 0',
  },
  '& .MuiInputLabel-root': {
    fontFamily: 'var(--font-gmarketMedium)',
    fontSize: '14px',
  },
  '& .MuiSelect-icon': {
    right: '10px',
    top: '44%',
  },
};

const menuItemSx = {
  fontFamily: 'var(--font-gmarketMedium)',
  fontSize: '12px',
  minHeight: '36px',
  padding: '8px 16px',
};
