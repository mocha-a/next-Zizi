import React from 'react';

export interface SortOption<T extends string> {
  label: string;
  value: T;
}

export interface SortSelectProps<T extends string | null> {
  value: T;
  options: readonly SortOption<Exclude<T, null>>[];
  onChange: (value: T | null) => void; // null도 받을 수 있도록
}

export const SortSelect = <T extends string | null>({
  value,
  options,
  onChange,
}: SortSelectProps<T>) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* 기본 버튼 */}
      <button
        onClick={() => onChange(null)}
        style={{
          padding: '12px',
          borderRadius: 8,
          backgroundColor: value === null ? '#e3f2fd' : '#fff',
          fontSize: 13,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        추천순
      </button>

      {/* 옵션 버튼 */}
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value as T)}
          style={{
            padding: '12px',
            borderRadius: 8,
            backgroundColor: value === opt.value ? '#e3f2fd' : '#fff',
            fontSize: 13,
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default SortSelect;