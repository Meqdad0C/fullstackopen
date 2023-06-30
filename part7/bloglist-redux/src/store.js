import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer.js'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    // users: usersReducer,
  },
})

store.subscribe(() => console.log(store.getState()))

export default store

