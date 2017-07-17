import { gql, graphql } from 'react-apollo'
import { Container, Button, Panel, PanelHeader, PanelFooter, Box, Subhead, Flex } from 'rebass';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage'
import PostUpvoter from './PostUpvoter'

const POSTS_PER_PAGE = 10;

const PanelBox = styled(Box)`
  border: 2px solid palevioletred;
`;

const PinkBorderedFlex = styled(Flex)`
  // border: 8px dashed pink;
`;

const GreenBorderedFlex = styled(Flex)`
  // border-left: 1px solid green;
`;

const StyledDiv = styled.div`
  width: 100%;
`;

const StyledBoxBackgroundIndexNo = styled(Box)`
  // background-image: linear-gradient(120deg, rgb(255, 0, 255), rgb(136, 0, 255));
`;

function PostList ({ data: { loading, error, allPosts, _allPostsMeta }, loadMorePosts }) {
  if (error) return <ErrorMessage message='Error loading posts.' />
  if (allPosts && allPosts.length) {
    const areMorePosts = allPosts.length < _allPostsMeta.count
    return (
      <section>
        <Panel color='gray3'>
          <PanelHeader
            color='white'
            bg='blue'>
            
            List 'o Stuff
          </PanelHeader>
          <PinkBorderedFlex justify='center' align='center' m='auto' p={2} width={[1, 2/3, 2/3, 2/3]}>
          <StyledDiv>
          {allPosts.map((post, index) =>
            <GreenBorderedFlex key={post.id} direction='row' align='center' width={[1]}>
                <StyledBoxBackgroundIndexNo p={2} key={post.id} w={59} align='center' bg='gray1'>
                  {index + 1}
                </StyledBoxBackgroundIndexNo>
                <Box p={2} w={[ 1, 1, 1 ]}>
                  <a href={post.url}>{post.title}</a>
                </Box>
                <PanelBox p={0} m={0} w={59} flex='1 1 auto'>
                  <GreenBorderedFlex direction="row" align='center' w={1, 1, 1}>
                    <PostUpvoter id={post.id} votes={post.votes} />
                  </GreenBorderedFlex>
                </PanelBox>
            </GreenBorderedFlex>
          )}
          </StyledDiv>
          </PinkBorderedFlex>
          <PanelFooter bg='fuschia5'  p={0} m={0}>
            {areMorePosts ? <Button bg='fuschia5' p={1} onClick={() => loadMorePosts()}> {loading ? 'Loading...' : 'Show More'} </Button> : ''}
          </PanelFooter>
        </Panel>
      </section>
    )
  }
  return <div>Loading</div>
}

const allPosts = gql`
  query allPosts($first: Int!, $skip: Int!) {
    allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
      votes
      url
      createdAt
    },
    _allPostsMeta {
      count
    }
  }
`

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(allPosts, {
  options: {
    variables: {
      skip: 0,
      first: POSTS_PER_PAGE
    }
  },
  props: ({ data }) => ({
    data,
    loadMorePosts: () => {
      return data.fetchMore({
        variables: {
          skip: data.allPosts.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            // Append the new posts results to the old one
            allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts]
          })
        }
      })
    }
  })
})(PostList)
