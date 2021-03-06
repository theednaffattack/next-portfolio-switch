import { connect } from 'react-redux';
import App from '../components/App';
import withData from '../lib/withData';
import Header from '../components/Header';
import Quotes from '../containers/Quotes';

export default withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />
      <Quotes />
  </App>
)
)
