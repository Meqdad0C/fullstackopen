import { createSlice } from '@reduxjs/toolkit'

/*export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: {
      filter,
    },
  }
}

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload.filter
    default:
      return state
  }
}*/

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload.filter
    },
  },
})

export default filterSlice.reducer
