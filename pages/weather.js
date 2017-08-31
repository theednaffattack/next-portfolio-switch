import { Container } from 'rebass';
// import axios from 'axios';
import { connect } from 'react-redux';
// import { axiosGetWeather, geoPositioning, foo, getPosition } from '../routeModules/Weather/modules/weather'
import App from '../components/App'
import Header from '../components/Header'
// import WeatherContainer from '../full_modules/Weather/containers/WeatherContainer'
import withData from '../lib/withData'
import GeoDemo from '../components/GeoDemo'

export default withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />
    <Container>
      <GeoDemo />
    </Container>
  </App>
))