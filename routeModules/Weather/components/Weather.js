import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import SvgLoader from '../assets/ring-alt.svg'

export function showData() {
  return <img src="../assets/ring-alt.svg" />;
}

export const Weather = ({ weather, axiosGetWeather, geoPositioning }) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Weather</h2>
    <button className="btn btn-success" onClick={geoPositioning}>Get My Weather!</button>
    {
      !weather ? '' :
      !weather.dataFetched && !weather.isFetching ? <div></div> :
      !weather.dataFetched && weather.isFetching ? <div><img src={SvgLoader} /></div> :
      <div><h1>{weather.data.current.temp_f}</h1></div>
    }
  </div>
)
Weather.propTypes = {
  weather: PropTypes.object.isRequired,
  axiosGetWeather: PropTypes.func.isRequired,
  geoPositioning: PropTypes.func.isRequired
}

export default Weather
