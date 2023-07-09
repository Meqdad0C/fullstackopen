import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload.newAnecdote)
      return state
    },
    updateAnecdote(state, action) {
      const { updatedAnecdote } = action.payload
      state = state.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
      return state
    },
    setAnecdotes(state, action) {
      return action.payload.anecdotes
    },
  },
})

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: 'anecdotes/setAnecdotes', payload: { anecdotes } })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({ type: 'anecdotes/appendAnecdote', payload: { newAnecdote } })
  }
}

export const updateAnecdote = (anecdote, payload) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, payload)
    dispatch({ type: 'anecdotes/updateAnecdote', payload: { updatedAnecdote } })
  }
}

export default anecdoteSlice.reducer
