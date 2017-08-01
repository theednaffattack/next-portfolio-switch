import axios from 'axios'
import { Button } from 'rebass'
import { connect } from 'react-redux';
import { geolocated, geoPropTypes } from 'react-geolocated';
import PropTypes from 'prop-types'
import React from 'react'
import { axiosGetWeather, geoPositioning, foo, getPosition } from '../modules/weather'

import weatherIcon from '../assets/ring-alt.svg'

export function showData() {
  return <img src="../assets/ring-alt.svg" />;
}

class Weather extends React.Component {

  componentDidMount() {
    const { weather } = this.props;
  }


  handleClick(dispatch) {
    // const { makeChoice } = this.props;
    const { weather, axiosGetWeather, geoPositioning } = this.props;
    const lat = this.props.lat
    const long = this.props.long
    axiosGetWeather(dispatch, lat, long)
  }

  render() {
    const { weather } = this.props;
    return (

      <div style={{ margin: '0 auto' }} >
        <h2>Weather</h2>
        <Button className="btn btn-success" onClick={()=>this.handleClick()}>Get My Weather!</Button>

        {
          !weather ? "" : 
          !weather.dataFetched && !weather.isFetching ? <div></div> : 
          !weather.dataFetched && weather.isFetching ? <div><img src={weatherIcon} /></div> :
          <div>
            <h1>{weather.data.current.temp_f} <small>f</small> | {weather.data.current.temp_c}<small>c</small></h1>
            <h2>{weather.data.location.name}, {weather.data.location.region}</h2>
          </div>
        }
      </div>
    )
  }
}

const mapDispatchToProps = {
  axiosGetWeather,
  geoPositioning,
  foo,
  getPosition
}

const mapStateToProps = (state) => ({
  weather : state.weather 
})

Weather.propTypes = {
  weather: PropTypes.object.isRequired,
  axiosGetWeather: PropTypes.func.isRequired,
  geoPositioning: PropTypes.func.isRequired,
  getPosition: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);