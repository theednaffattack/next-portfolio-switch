import Link from 'next/link'
import { Box, Container, Flex, NavLink, Provider, Toolbar, Text } from 'rebass';
import styled from 'styled-components';

const StyledLink = styled.a`
  color: red;
  background: blue;
`
const theme = {
  breakpoints: [
    // min-width breakpoints in ems
    40, 52, 64
  ],
  space: [
    0, 6, 12, 18, 24, 30, 36
  ],
  fontSizes: [
    12, 16, 18, 24, 36, 48, 72
  ],
  weights: [
    400, 600
  ],
  font: 'Avenir, serif',
  monospace: '"brandon-grotesque,sans-serif", Menlo, monospace',
  radius: 2
};

const StyledNavLink = styled(NavLink)`
  text-shadow: 1.5px 1.5px 1.5px rgba(0,0,0, 0.3);
  color='#005A31';
`;

const StyledToolbar = styled(Toolbar)`
  // background: linear-gradient(90deg, #FD6F46 10%, #FB9832 90%);
  background: linear-gradient(90deg, #A8CD1B 10%, #529226 90%);
`;

export default ({ pathname, href, name }) => (
  <Provider theme={theme}>
    <StyledToolbar>
      <Flex>
        <Box px={2} w={[ 1, 1/2, 1/4 ]}>
          <Link prefetch href='/' passHref>
            <StyledNavLink as='a' href='/' active={pathname =='/' ? true : false}>Home</StyledNavLink>
          </Link>
        </Box>
        <Box px={2} w={[ 1, 1/2, 1/4 ]}>
          <StyledNavLink as='a' href='/projects' active={pathname =='/projects' ? true : false}>Projects</StyledNavLink>
        </Box>
        <Box px={2} w={[ 1, 1/2, 1/4 ]}>
          <StyledNavLink as='a' href='/about' active={pathname =='/about' ? true : false}>About</StyledNavLink>
        </Box>
        <Box px={2} w={[ 1, 1/2, 1/4 ]}>
          <StyledNavLink as='a' href='/example' active={pathname =='/example' ? true : false}>Redux Example</StyledNavLink>
        </Box>
        <Box px={2} w={[ 1, 1/2, 1/4 ]}>
          <StyledNavLink as='a' href='/twitch' active={pathname =='/twitch' ? true : false}>TwitchTV</StyledNavLink>
        </Box>
        <Box px={2} w={[ 1, 1/2, 1/4 ]}>
          <StyledNavLink as='a' href='/wikisearch' active={pathname =='/wikisearch' ? true : false}>Wiki Search</StyledNavLink>
        </Box>
      </Flex>
    </StyledToolbar>
  </Provider>
)
