import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Avatar, 
  BackgroundImage, 
  Box, 
  Button, 
  Card, 
  Container, 
  Flex, 
  Heading, 
  Input, 
  Panel, 
  Pre, 
  Small, 
  Subhead, 
  Text
} from 'rebass';
import { Col, Row } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import App from '../components/App'
import  * as wikiActions  from '../ducks/wikisearch';
import  { getWiki }  from '../ducks/wikisearch';
// import withData from '../lib/withData';

const MaxWidthPanel = styled(Panel)`
  max-width: 600px;
  border: 0;
`;

const SharpCornersPanel = styled(Panel)`
    border-radius: 0px;
`;

const StyledInput = styled(Input)`
  border-radius: 65px;
  max-width: 50%;
  text-align: center;
`;
/**
 * Home component to show basic redux usage with nextjs.
 */
class WikiSearch extends Component {
  // static propTypes = {
  //   /**
  //    * demo string from redux actions.
  //    */
  //   state: PropTypes.object.isRequired,
  //   *
  //    * redux function from actions to set the string, accepts a string param,
  //    * if none is passed, it will return the default string set in the action.
     
  //   getWiki: PropTypes.func.isRequired,
  // };
  constructor() {
    super();
    this.wikiSearch = this.wikiSearch.bind(this);
    this.state = {
      searchBox: ''
    };
  }
  componentDidMount() {
    const { getWiki } = this.props;
    // getWiki();
  }

  handleInputChange(event) {
          this.setState({
              searchBox: event.target.value
          });
      }

  handleSubmit(event) {
    const { getWiki } = this.props;
      event.preventDefault();
      let searchBox = this.state.searchBox.trim(); // Remove whitespace at the beginning and end.
      let searchGeneratorType = 'search'; // set the generator type in the URI string
      const searchParameter = '&gsrsearch='; // tacked into the URI for the REST call
      let searchOptions = searchGeneratorType + searchParameter + searchBox;

      if (!searchBox) { // If no search term was typed, return early and do nothing.
          return;
      }

      console.log('searchOptions in the submit handler: ' + searchOptions)

      this.props.getWiki(searchOptions); // Execute callback
      this.setState({ searchBox: '' });
  }

  /**
   * Change the demo string to whatever you pass as a parameter.
   * @param {string} theString - String to be passed to show in component.
   */
  wikiSearch(options) {
    // setString(theString);
    const { getWiki } = this.props;
    console.log('search options passed in wikiSearch: ' + options)
    getWiki(options);
  }

  render() {
    const { wiki, getWiki } = this.props;

    const pages = !this.props.wiki.fetchedData ? '' :
                  !this.props.wiki.fetchedData ? '' :
                  !this.props.wiki.fetchedData.query ? '' :
                  !this.props.wiki.fetchedData.query.pages ? '' :
                  // this.props.wiki.fetchedData.query.pages
                  Object.keys(this.props.wiki.fetchedData.query.pages).map(function(k) {
                    return +k, this.props.wiki.fetchedData.query.pages[k];
                  }, this);
    const renderUpPages =  !pages ? '' :
                            pages.length < 0 && !pages.isArray(pages) ? '' :
                            pages.map(function(item, index) {
                              return  <SharpCornersPanel color='blue' p={2} key={index + item.title}>
                                        <Text color='blue'>
                                           {index + 1} - <a href={`http://en.wikipedia.org/?curid=${item.pageid}`} target='_blank'>{item.title}</a>
                                         </Text>
                                      </SharpCornersPanel>;
                            });
    return (
      <App title="WikiSearch page">
        <Container>
          <Heading is='h1' fontSize={[6]}>😆 You Wiki Me Crazy 😆</Heading>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <StyledInput
              type='text'
              placeholder='Search Wikipedia...'
              name='searchBox'
              id='searchBox'
              p={3}
              onChange={this.handleInputChange.bind(this)}
              value={this.state.searchBox} />

            <br/>
            <Button
              bg='green6'
              p={1}
              mt={3}
              is='a'
              onClick={() => this.wikiSearch('random')}>
              Get a Random Page
            </Button>
          </form>
          <Box>
            <MaxWidthPanel
              mx='auto'>
              <Row>
                <Col xs={12} md={12}>
                  {/* <Pre>{ JSON.stringify(pages, null, 2) || "It's blank" }</Pre> */}
                  {
                    !renderUpPages ? ''  :
                    renderUpPages
                  }
                </Col>
              </Row>
            </MaxWidthPanel>
          </Box>
        </Container>
      </App>  
    )
  }
}

WikiSearch.propTypes = {
  wiki: PropTypes.shape({
    fetchedData: PropTypes.object.isRequired
  }),
  getWiki: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  getWiki,
};

const mapStateToProps = (state) => ({
  wiki: state.wiki
});

export default connect(mapStateToProps, mapDispatchToProps)(WikiSearch);
