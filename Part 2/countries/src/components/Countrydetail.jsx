const CountryDetail = ({ country, weather }) => (
  <>
    <h1>{country.name.common}</h1>
    <p>
    	Capital {country.capital}
    	<br />
    	Area {country.area}
    </p>
    <h2>Languages</h2>
    <ul>{Object.values(country.languages).map((l,i)=> <li key={i}>{l}</li>)}</ul>
    <img src={country.flags?.png} alt={`Flag of ${country.name.common}`} width="200" />
    {weather ? (
      <>
        <h2>Weather in {country.capital?.[0]}</h2>
        <p>Temperature {weather.main?.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`} alt={weather.weather?.[0]?.description} />
        <p>Wind {weather.wind?.speed} m/s</p>
      </>
    ) : <p>Loading weather...</p>}
  </>
)

export default CountryDetail