const SearchInput = ({ value, onChange }) => {
  return (
    <p>
      find countries{' '}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </p>
  )
}

export default SearchInput
