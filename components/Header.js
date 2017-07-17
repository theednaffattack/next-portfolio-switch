import Link from 'next/link'
import { Toolbar, Text, Container, NavLink, Flex, Box } from 'rebass';
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
  text-shadow: 1.5px 1.5px 1.5px rgba(0,0,0, 0.3);
`;

const StyledToolbar = styled(Toolbar)`
  background: linear-gradient(90deg, #FD6F46 10%, #FB9832 90%);
`;

export default ({ pathname }) => (
  <StyledToolbar>
    <Flex>
      <Box px={2} w={[ 1, 1/2, 1/4 ]}>
        <StyledNavLink as='a' href='/' active={pathname =='/' ? true : false}>Home</StyledNavLink>
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
    </Flex>
  </StyledToolbar>
)
