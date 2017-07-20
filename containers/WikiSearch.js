import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Avatar, BackgroundImage, Box, Button, Card, Container, Flex, Heading, Panel, Pre, Small, Subhead, Text } from 'rebass';
import { Col, Row } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import App from '../components/App'
import  * as wikiActions  from '../ducks/wikisearch';
import  { getWiki }  from '../ducks/wikisearch';
// import withData from '../lib/withData';
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
  }
  componentDidMount() {
    const { getWiki } = this.props;
    // getWiki();
  }

  /**
   * Change the demo string to whatever you pass as a parameter.
   * @param {string} theString - String to be passed to show in component.
   */
  wikiSearch() {
    // setString(theString);
    const { getWiki } = this.props;
    getWiki();
  }

  render() {
    // const exampleString = this.props.state.wiki ? this.props.state.example.wiki : '';
    const { wiki, getWiki } = this.props;
    const pages = !this.props.wiki ? '' :
                  !this.props.wiki.data ? '' :
                  !this.props.wiki.data.query ? '' :
                  this.props.wiki.data.query.pages[0]
    return (
      <App title="WikiSearch page">
        <Heading is='h1' fontSize={[null, 2, 3]}>Wheres my String?</Heading>
        <Button
          bg='fuschia5'
          p={1}
          onClick={() => this.wikiSearch}
        >
          Search Wikipedia
        </Button>
        <br/>
        <Button
          bg='pink4'
          p={1}
          onClick={() => this.wikiSearch()}
        >
          Get a Random Wikipedia Page
        </Button>
        <p>
         
        </p>
        <input type='text' name='search' id='search'/>
        <h2>Let's map some stuff</h2>
          <Panel>
            <Row>
              <Col xs={1} md={1}>
              </Col>
            </Row>
          </Panel>
      </App>
    )
  }
}

WikiSearch.propTypes = {
  wiki: PropTypes.shape({
    streams: PropTypes.array.isRequired
  }),
  getWiki: PropTypes.func.isRequired
}

// function mapStateToProps(state) {
//   return { wiki: state.wiki.payload }
// }

// function mapDispatchToProps(dispatch) {
//   wikiActions,
// }

const mapDispatchToProps = {
  getWiki,
};

const mapStateToProps = (state) => ({
  wiki: state.wiki
});

export default connect(mapStateToProps, mapDispatchToProps)(WikiSearch);


// export default connect((state) => ({state}), mapDispatchToProps)(WikiSearch);
