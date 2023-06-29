import { createSlice } from '@reduxjs/toolkit'

let last_timeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      const { timeoutId, notification } = action.payload
      clearTimeout(last_timeoutId)
      last_timeoutId = timeoutId
      return notification
    },
    clearNotification(state, action) {
      return ''
    },
  },
})

export default notificationSlice.reducer
