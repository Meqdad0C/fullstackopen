import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  return (
    <div className="filter">
      <h2>search</h2>
      <div>
        <input
          autoComplete="off"
          type="text"
          name="search"
          onChange={(event) => {
            dispatch({ type: 'filter/setFilter', payload: { filter: event.target.value } })
          }}
        />
      </div>
    </div>
  )
}

export default Filter
