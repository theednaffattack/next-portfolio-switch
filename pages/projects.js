import { Container, Flex, Heading, Subhead } from 'rebass';
import styled from 'styled-components';
import App from '../components/App'
import Header from '../components/Header'
import Projects from '../components/Projects';

export default (props) => (
  <App>
    <Header pathname={props.url.pathname} />
    <Projects />
  </App>
)
