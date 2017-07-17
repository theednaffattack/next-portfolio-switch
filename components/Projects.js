import { BackgroundImage, Box, Card, Container, Flex, Heading, Subhead } from 'rebass';
import styled from 'styled-components';
import Header from '../components/Header'

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

const myProjects = ['project 1', 'project 2', 'project 3', 'project 4', 'project 5', 'project 6'];

export default ({ pathname }) => (
  <div>
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
    <section>
      <Container>



        <Flex wrap pt={6}>
          <Box width={[1/2, 1/3]} p={2}>
<Card>
            <BackgroundImage
              ratio={1}
              src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
            />
            <Subhead p={2}>
              Project 1
            </Subhead>
          </Card>
        </Box>
          <Box width={[1/2, 1/3]} p={2}>
<Card>
            <BackgroundImage
              ratio={1}
              src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
            />
            <Subhead p={2}>
              Project 1
            </Subhead>
          </Card>
        </Box>
          <Box width={[1/2, 1/3]} p={2}>
<Card>
            <BackgroundImage
              ratio={1}
              src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
            />
            <Subhead p={2}>
              Project 1
            </Subhead>
          </Card>
        </Box>
          <Box width={[1/2, 1/3]} p={2}>
<Card>
            <BackgroundImage
              ratio={1}
              src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
            />
            <Subhead p={2}>
              Project 1
            </Subhead>
          </Card>
        </Box>

        </Flex>
      </Container>
    </section>
  </div>
);