import App from '../components/App';
import withData from '../lib/withData';
import Header from '../components/Header';
import PomodoroContainer from '../containers/PomodoroContainer';

export default withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />
      <PomodoroContainer />
  </App>
)
)
