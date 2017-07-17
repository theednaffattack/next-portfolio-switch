import { Container } from 'rebass';
// import axios from 'axios';
// import { connect } from 'react-redux';
// import { axiosGetWeather, geoPositioning, foo } from '../routeModules/Weather/modules/weather'
import App from '../components/App'
import Header from '../components/Header'
// import Weather from '../routeModules/Weather/components/Weather';
// import withData from '../lib/withData'

// const mapDispatchToProps = {
//   axiosGetWeather,
//   geoPositioning,
//   foo
// }

// const mapStateToProps = (state) => ({
//   weather : state.weather
// })

// export default connect(mapStateToProps, mapDispatchToProps)(withData((props) => (
//   <App>
//     <Header pathname={props.url.pathname} />
//     <Container>
//       <Weather />
//     </Container>
//   </App>
// )))

export default (props) => (
  <App>
    <Header pathname={props.url.pathname} />
    <Container>
      <div>This is fine...</div>
    </Container>
  </App>
)