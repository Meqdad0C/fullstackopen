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

export const sendNotification = ({ message, time_s, isError }) => {
  const notification_time_s = time_s || 5
  const type = isError ? 'error' : 'success'
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
    }, notification_time_s * 1000)
  }
}

export default notificationSlice.reducer
