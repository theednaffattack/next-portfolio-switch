import { Container, Flex, Heading, Subhead } from 'rebass';
import styled from 'styled-components';
import App from '../components/App'
import Header from '../components/Header'

const FlexStackVerticalArticle = styled(Flex)`
  border: 2px goldenrod solid;
`;

const FlexAlignCenterArticle = styled(Flex)`
  min-height: 600px;
  border: 2px green solid;
`;

const IntroSection = styled.section`
  background-image: linear-gradient(120deg, #f0f, #80f);
`;

export default (props) => (
  <App>
    <Header pathname={props.url.pathname} />
    <IntroSection>
      <Container>
        <FlexAlignCenterArticle align='center'>
          <FlexStackVerticalArticle direction='column' mx='auto' mt={-200}>
            <Heading is='h1' f={[5, 4, 4, 4, 4, 5]} mx='auto'>About</Heading>
            <Subhead f={[2, 2,2,2,2]} p={4} mx='auto'>
              I enjoy making apps that are lean, functional, and stylish.
            </Subhead>
          </FlexStackVerticalArticle>
        </FlexAlignCenterArticle>
      </Container>
    </IntroSection>
  </App>
)
