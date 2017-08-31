import { geolocated } from 'react-geolocated';
import React from 'react';
// import { axiosGetWeather, geoPositioning, foo, getPosition, toggleUnits } from '../routeModules/Weather/modules/weather'
import Weather from '../full_modules/Weather/components/Weather'
import { Pre } from 'rebass'


class GeoDemo extends React.Component {
  render() {
    const { weather, coords, toggleUnits } = this.props;
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <div>
            <Weather lat={this.props.coords.latitude} long={this.props.coords.longitude} />
            <Pre>{this.props.coords.latitude}</Pre>
            <Pre>{this.props.coords.longitude}</Pre>
          </div>
          : <div>Getting the location data&hellip; </div>;
  }
}

 
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GeoDemo);