import { createSlice } from '@reduxjs/toolkit'

let timeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      const { notification } = action.payload
      return notification
    },
    clearNotification() {
      return ''
    },
  },
})

export const sendNotification = (notification, time_s) => {
  return (dispatch) => {
    dispatch({
      type: 'notification/setNotification',
      payload: {
        notification,
      },
    })
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch({ type: 'notification/clearNotification' })
    }, time_s * 1000)
  }
}

export default notificationSlice.reducer
