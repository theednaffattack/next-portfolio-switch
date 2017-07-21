import { Box, Container, Flex, Heading, Subhead } from 'rebass';
import styled from 'styled-components';
import App from '../components/App'
import Header from '../components/Header'
import Simon from '../containers/Simon'

const BoxSimon = styled(Box)`
  // min-height: 150px;
  // min-width: 150px;
  // max-height: 150px;
  // max-width: 150px;
  border: 2px green solid;
`;

const BoxSimonWrapper = styled(Flex)`
  border: 2px goldenrod solid;
  height: 150px;
`;

const IntroSection = styled.section`
  // background-image: linear-gradient(120deg, #f0f, #80f);
  background-color: gray;
  min-height: 500px;
`;

export default (props) => (
  <App>
    <Header pathname={props.url.pathname} />
    <IntroSection>
      <Container>
        <Simon />
      </Container>
    </IntroSection>
  </App>
)
