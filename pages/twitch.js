import { connect } from 'react-redux';
import App from '../components/App'
import withData from '../lib/withData'
import Header from '../components/Header'
import TwitchTv from '../containers/TwitchTv'

export default withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />
      <TwitchTv />
  </App>
)
)
