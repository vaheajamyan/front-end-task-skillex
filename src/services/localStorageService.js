export const getFiltersFromLocalStorage = () => {
    const items =  localStorage.getItem('filters');

    if (items) {
        return JSON.parse(items)
    }

    return null
}
export const setFiltersToLocalStorage = (filters) => {
    localStorage.setItem('filters', JSON.stringify(filters))
}