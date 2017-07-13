import App from '../components/App'
import Header from '../components/Header'
import Submit from '../components/Submit'
import PostList from '../components/PostList'
import withData from '../lib/withData'
import { connect } from 'react-redux';

const homeIndex = withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />
    <Submit />
    <PostList />
  </App>
))

export default homeIndex 