import { Button, Arrow, Text, Box, Flex } from 'rebass';
import styled from 'styled-components';

const VoteUpButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #e4e4e4;
  color: #000;
  &:active {
    background-color: transparent;
  }
`
const VoteBox = styled(Box)`
  // border: 1px goldenrod solid;
`
const PanelGridBorderFlex = styled(Flex)`
  // border: 1px dashed red;
`;

function PanelGrid ({ upvote, votes, id }) {
  return (
      <PanelGridBorderFlex nowrap align='stretch' direction='row' w={[ 1, 1, 1 ]} p={0} m={0}  onClick={() => upvote(id, votes + 1)}>
          <VoteBox flex='1 1 auto' w={[ 1/2, 1/2, 1/2 ]} p={0} m={0} justify='end'><Arrow direction='up' /></VoteBox>
          <VoteBox w={[ 1/2, 1/2, 1/2 ]} p={0} m={0}><Text>{votes}</Text></VoteBox>
      </PanelGridBorderFlex>
  )
}

export default PanelGrid;
