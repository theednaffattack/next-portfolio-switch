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

const BoxSimon = styled(Box)`
  border: 2px green solid;
`;

const BoxSimonWrapper = styled(Flex)`
  border: 2px goldenrod solid;
  height: 150px;
`;
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
class Simon extends Component {
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
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const { getWiki } = this.props;
    // getWiki();
  }

  handleClick(e) {
    // do stuff
    console.log(e.target.value)
  }

  /**
   * Change the demo string to whatever you pass as a parameter.
   * @param {string} theString - String to be passed to show in component.
   */
  // wikiSearch(options) {
  //   // setString(theString);
  //   const { getWiki } = this.props;
  //   console.log('search options passed in wikiSearch: ' + options)
  //   getWiki(options);
  // }

  render() {
    const { fakeProp } = this.props;
  
    const clickVal = [];

    
      const clickStore = clickVal.map(function(eachClick) {
        return console.log("<Text color='purple'>eachClick</Text>")
      }, this)
    
    return (
      <App title="WikiSearch page">
        <Container>
          <Flex wrap mx={-2} p={4}>
            <BoxSimonWrapper p={4} w={[ 1/2 ]}>
              <Button
                p={4}
                m='auto'
                w={[ 1, 1/5 ]}
                color='gray1'
                bg='blue'
                value='blue'
                onClick={this.handleClick}>Blue</Button>
            </BoxSimonWrapper>
            <BoxSimonWrapper p={4} w={[ 1/2 ]}>
              <Button
                p={4}
                m='auto'
                w={[ 1, 1/5 ]}
                color='gray1'
                bg='red'
                value='red'
                onClick={this.handleClick}>Box</Button>
            </BoxSimonWrapper>
            <BoxSimonWrapper p={4} w={[ 1/2 ]}>
              <Button
                p={4}
                m='auto'
                w={[ 1, 1/5 ]}
                color='blue'
                bg='yellow'
                value='yellow'
                onClick={this.handleClick}>Box</Button>
            </BoxSimonWrapper>
            <BoxSimonWrapper p={4} w={[ 1/2 ]}>
              <Button
                p={4}
                m='auto'
                w={[ 1, 1/5 ]}
                color='gray9'
                bg='green'
                value='green'
                onClick={this.handleClick}>Box</Button>
            </BoxSimonWrapper>
          </Flex>
        </Container>
      </App>  
    )
  }
}

// WikiSearch.propTypes = {
//   wiki: PropTypes.shape({
//     fetchedData: PropTypes.object.isRequired
//   }),
//   getWiki: PropTypes.func.isRequired
// }

const mapDispatchToProps = {
  getWiki,
};

const mapStateToProps = (state) => ({
  wiki: state.wiki
});

// export default connect(mapStateToProps, mapDispatchToProps)(WikiSearch);
export default Simon
