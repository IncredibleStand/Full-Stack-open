import { useState, useEffect } from 'react'
import SearchInput from './components/SearchInput'
import CountryList from './components/CountryList'
import CountryDetail from './components/Countrydetail'
import getAllCountries from './services/countries'
import getWeather from './services/weather'

const App = () => {
  const [name, setName] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)


  const api_key = import.meta.env.VITE_WEATHER_KEY
  
  // Fetch all countries
  useEffect(() => {
    if (!name) {
      setCountries([])
      return
    }

    getAllCountries()
      .then(response => {
        const matched = response.data.filter(c =>
          c.name.common.toLowerCase().includes(name.toLowerCase())
        )
        setCountries(matched)
      })
      .catch(error => console.error('Error fetching countries:', error))
  }, [name])

  // Fetch weather for a single (matched) country
  useEffect(() => {
    if (countries.length === 1) {
      const capital = countries[0].capital[0]
      if (!capital) return

      getWeather(capital, api_key)
        .then(response => setWeather(response.data))
        .catch(error => {
          console.error('Weather fetch failed:', error)
          setWeather(null)
        })
    }
  }, [countries])

  useEffect(() => {
    setSelectedCountry(null) // Reset when user types new search
  }, [name])



  return (
    <>
      <SearchInput value={name} onChange={setName} />

      {countries.length > 10 && <p>Too many matches, specify another filter</p>}

      {countries.length > 1 && countries.length <= 10 && (
        <CountryList countries={countries} onSelectCountry={setSelectedCountry}/>
      )}

      {countries.length === 1 && (
        <CountryDetail country={countries[0]} weather={weather} />
      )}

      {selectedCountry && (
        <CountryDetail country={selectedCountry} weather={weather} />
      )}
    </>
  )
   
}

export default App