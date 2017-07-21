import { Container } from 'rebass';
import App from '../components/App'
import Header from '../components/Header'
import WikiSearchViewer from '../containers/WikiSearchViewer'
import withData from '../lib/withData';

export default withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />
    <Container>
      <WikiSearchViewer />
    </Container>
  </App>
))
