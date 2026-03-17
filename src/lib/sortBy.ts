export type SortOrder = 'asc' | 'desc'

export const sortBy = <T>(
  list: T[],
  getValue: (item: T) => string | number | undefined,
  order: SortOrder = 'asc'
) => {
  return [...list].sort((a, b) => {
    let aValue = getValue(a)
    let bValue = getValue(b)

    // undefined 처리: string이면 '', number면 0
    if (typeof aValue === 'undefined') aValue = typeof bValue === 'string' ? '' : 0
    if (typeof bValue === 'undefined') bValue = typeof aValue === 'string' ? '' : 0

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