export const toggleCourse = (course_id) => ({
    type: 'TOGGLE_COURSE',
    course_id
  })

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_SELECTED',
  SHOW_ACTIVE: 'SHOW_REMAINING'
}
