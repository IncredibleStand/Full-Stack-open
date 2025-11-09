const CountryList = ({ countries, onSelectCountry }) => (
  <>
    {countries.map(c => 
      <div key={c.cca3}>
        {c.name.common}
        <button onClick={() => onSelectCountry(c)}>Show</button>
    </div>)}
  </>
)

export default CountryList
