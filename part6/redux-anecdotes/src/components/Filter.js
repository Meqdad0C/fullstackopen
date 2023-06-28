import { filterChange } from '../reducers/filterReducer'
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
            dispatch(filterChange(event.target.value))
          }}
        />
      </div>
    </div>
  )
}

export default Filter
