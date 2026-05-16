import { useAnecdoteControls } from '../store'

const Filter = () => {
  const { setFilter } = useAnecdoteControls()

  const handleChange = (event) => {
    // Pass the typed value directly to the store
    setFilter(event.target.value) 
  }
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter