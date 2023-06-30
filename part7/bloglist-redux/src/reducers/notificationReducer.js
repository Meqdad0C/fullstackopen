import { createSlice } from '@reduxjs/toolkit'

let timeoutID = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    type: 'success',
  },
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message
      state.type = action.payload.type
      return state
    },
    clearNotification(state) {
      state.message = ''
      state.type = 'success'
      return state
    },
  },
})

export const sendNotification = ({ message, type }, time_s) => {
  return (dispatch) => {
    dispatch({
      type: 'notification/setNotification',
      payload: {
        message,
        type,
      },
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({ type: 'notification/clearNotification' })
    }, time_s * 1000)
  }
}

export default notificationSlice.reducer
