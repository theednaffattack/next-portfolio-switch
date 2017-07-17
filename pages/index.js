import { Container } from 'rebass';
import App from '../components/App'
import Header from '../components/Header'
import Submit from '../components/Submit'
import PostList from '../components/PostList'
import withData from '../lib/withData'
import { connect } from 'react-redux';

export default withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />
    <Container>
      <Submit />
      <PostList />
    </Container>
  </App>
))
