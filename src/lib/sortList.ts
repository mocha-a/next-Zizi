type SortOrder = 'asc' | 'desc';

export const sortList = <T>(
  list: T[],
  getValue: (item: T) => string | number,
  order: SortOrder = 'asc'
) => {
  const copied = [...list];

  return copied.sort((a, b) => {
    const aValue = getValue(a);
    const bValue = getValue(b);

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return order === 'asc'
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });
};