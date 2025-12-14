import React from 'react';

interface SortOption<T extends string> {
  label: string
  value: T
}

interface SortSelectProps<T extends string | null> {
  value: T
  options: readonly SortOption<Exclude<T, null>>[]
  onChange: (value: T) => void
}

const SortSelect = <T extends string | null>({
  value,
  options,
  onChange,
}: SortSelectProps<T>) => {
  return (
    <select
      value={value ?? ''}
      onChange={(e) =>
        onChange((e.target.value || null) as T)
      }
    >
      <option value="">정렬 기준</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

export default SortSelect
