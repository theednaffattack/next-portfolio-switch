import { Container, Flex, Heading, Subhead } from 'rebass';
import styled from 'styled-components';
import Header from '../components/Header'
import Projects from '../components/Projects';

const IntroSection = styled.section`
  background: linear-gradient(90deg, #FD6F46 10%, #FB9832 90%);
`;

const FlexStackVerticalArticle = styled(Flex)`
  border: 2px #ddd dashed;
`;

const FlexAlignCenterArticle = styled(Flex)`
  min-height: 600px;
  border: 2px #fff dashed;
  // #00cc55 
`;

export default ({ pathname }) => (
    <IntroSection>
      <Container>
        <FlexAlignCenterArticle align='center'>
          <FlexStackVerticalArticle direction='column' mx='auto' mt={-200}>
            <Heading is='h1' f={[5, 4, 4, 4, 4, 5]} mx='auto'>Projects</Heading>
            <Subhead f={[2, 2,2,2,2]} p={4} mx='auto'>
              I enjoy making apps that are lean, functional, and stylish.
            </Subhead>
          </FlexStackVerticalArticle>
        </FlexAlignCenterArticle>
      </Container>
    </IntroSection>
);