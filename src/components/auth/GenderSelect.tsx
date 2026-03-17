import TagBtn from '@/components/common/TagBtn';

const GENDER_OPTIONS = [
  { label: '여성', value: 'female'},
  { label: '남성', value: 'male'},
  { label: '기타', value: 'etc'},
//   { label: '선택 안 함', value: null}
];

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
}

function GenderSelect({ value, onChange }: Props) {
  return (
    <div className='gender-item-box'>
      {GENDER_OPTIONS.map((option) => (
        <div
          key={option.label}
          onClick={() => onChange(option.value)}
        >
          <TagBtn
            className={value === option.value ? 'active' : ''}
            tagbtn={option.label}
          />
        </div>
      ))}
    </div>
  );
}

export default GenderSelect;
