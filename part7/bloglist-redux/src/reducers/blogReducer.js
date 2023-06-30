import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload.newBlog)
      return state
    },
    updateBlog(state, action) {
      const { updatedBlog } = action.payload
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
    setBlogs(state, action) {
      return action.payload.blogs
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'blogs/setBlogs', payload: { blogs } })
  }
}

export const createBlog = (blog,current_user) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    newBlog.user = {
      id: newBlog.user,
      ...current_user,
    }
    dispatch({ type: 'blogs/addBlog', payload: { newBlog } })
  }
}

export const updateBlog = (blog) => {
  const { id, user: blog_owner } = blog
  blog.user = blog_owner.id
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, blog)
    updatedBlog.user = blog_owner
    dispatch({ type: 'blogs/updateBlog', payload: { updatedBlog } })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({ type: 'blogs/removeBlog', payload: { id } })
  }
}

export default blogSlice.reducer
