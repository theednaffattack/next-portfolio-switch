import { Container } from 'rebass';
import App from '../components/App'
import Header from '../components/Header'
import WikiSearch from '../containers/WikiSearch'
import withData from '../lib/withData';

export default withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />
    <Container>
      <WikiSearch />
    </Container>
  </App>
))
