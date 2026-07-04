import TagBtn from '@/components/common/TagBtn';
import { GENDER_OPTIONS } from '@/types/user/profile';

interface Props {
  value: string | null;
  onChange?: (value: string | null) => void;
  readonly?: boolean;
  className?: string;
  allowClear?: boolean;
}

function GenderSelect({ value, onChange, readonly, className, allowClear = false }: Props) {
  return (
    <div className={`gender-item-box ${className ?? ''}`}>
      {GENDER_OPTIONS.map((option) => (
        <div
          key={option.label}
          onClick={() => {
            if (readonly) return;

            if (allowClear && value === option.value) {
              onChange?.(null);
            } else {
              onChange?.(option.value);
            }
          }}
        >
          <TagBtn
            readonly={readonly}
            className={value === option.value ? 'active' : ''}
            tagbtn={option.label}
          />
        </div>
      ))}
    </div>
  );
}
export default GenderSelect;