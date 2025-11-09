import axios from 'axios'

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAllCountries = () => axios.get(`${BASE_URL}/all`)

export default getAllCountries