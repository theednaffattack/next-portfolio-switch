import { Container } from 'rebass';
import App from '../components/App'
import Header from '../components/Header'
import Example from '../containers/example'
import withData from '../lib/withData';

export default withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />
    <Container>
      <Example />
    </Container>
  </App>
))
