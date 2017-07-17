import React from 'react'
import { gql, graphql } from 'react-apollo'
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
const PostUpVoterBorderFlex = styled(Flex)`
  // border: 1px dashed red;
`;

function PostUpvoter ({ upvote, votes, id }) {
  return (
      <PostUpVoterBorderFlex nowrap align='stretch' direction='row' w={[ 1, 1, 1 ]} p={0} m={0}  onClick={() => upvote(id, votes + 1)}>
          <VoteBox flex='1 1 auto' w={[ 1/2, 1/2, 1/2 ]} p={0} m={0} justify='end'><Arrow direction='up' /></VoteBox>
          <VoteBox w={[ 1/2, 1/2, 1/2 ]} p={0} m={0}><Text>{votes}</Text></VoteBox>
      </PostUpVoterBorderFlex>
  )
}

const upvotePost = gql`
  mutation updatePost($id: ID!, $votes: Int) {
    updatePost(id: $id, votes: $votes) {
      id
      __typename
      votes
    }
  }
`

export default graphql(upvotePost, {
  props: ({ ownProps, mutate }) => ({
    upvote: (id, votes) => mutate({
      variables: { id, votes },
      optimisticResponse: {
        __typename: 'Mutation',
        updatePost: {
          __typename: 'Post',
          id: ownProps.id,
          votes: ownProps.votes + 1
        }
      }
    })
  })
})(PostUpvoter)
