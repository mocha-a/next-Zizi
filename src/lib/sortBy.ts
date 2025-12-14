export type SortOrder = 'asc' | 'desc'

export const sortBy = <T>(
  list: T[],
  getValue: (item: T) => string | number,
  order: SortOrder = 'asc'
) => {
  return [...list].sort((a, b) => {
    const aValue = getValue(a)
    const bValue = getValue(b)

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc'
        ? aValue.localeCompare(bValue, 'ko')
        : bValue.localeCompare(aValue, 'ko')
    }

    return order === 'asc'
      ? Number(aValue) - Number(bValue)
      : Number(bValue) - Number(aValue)
  })
}
