import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'

describe('anecdoteReducer', () => {
  test('returns new state with action notes/createNote', () => {
    const state = []
    const action = {
      type: 'anecdotes/createAnecdote',
      payload: { content: 'the app state is in redux store' },
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState.map((s) => s.content)).toContainEqual(
      action.payload.content
    )
  })

  test('returns new state with action anecdotes/voteAnecdote', () => {
    const state = [
      {
        content: 'the app state is in redux store',
        votes: 10,
        id: 1,
      },
      {
        content: 'state changes are made with actions',
        votes: 20,
        id: 2,
      },
    ]

    const action = {
      type: 'anecdotes/voteAnecdote',
      payload: { id: 2 },
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(2)

    expect(newState).toContainEqual(state[0])

    expect(newState).toContainEqual({
      content: 'state changes are made with actions',
      votes: 21,
      id: 2,
    })
  })
})
