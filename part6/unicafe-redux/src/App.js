import { createStore } from 'redux'
import reducer from './reducers/counterReducer'

export const store = createStore(reducer)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD',
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK',
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD',
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO',
    })
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

export default App