import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Heading } from 'rebass';
import App from '../components/App'
import * as exampleActions from '../actions/exampleActions';
import withData from '../lib/withData';
/**
 * Home component to show basic redux usage with nextjs.
 */
class Example extends Component {
  static propTypes = {
    /**
     * demo string from redux actions.
     */
    state: PropTypes.object.isRequired,
    /**
     * redux function from actions to set the string, accepts a string param,
     * if none is passed, it will return the default string set in the action.
     */
    setString: PropTypes.func.isRequired,
  };
  constructor() {
    super();
    this.changeExampleString = this.changeExampleString.bind(this);
  }
  componentDidMount() {
    const { setString } = this.props;
    setString();
  }

  /**
   * Change the demo string to whatever you pass as a parameter.
   * @param {string} theString - String to be passed to show in component.
   */
  changeExampleString(theString) {
    const { setString } = this.props;
    setString(theString);
  }

  render() {
    const exampleString = this.props.state.example ? this.props.state.example.payload : '';
    return (
      <App title="Example page">
        <Heading is='h1' fontSize={[null, 2, 3]}>Wheres my String?</Heading>
        <Button
          bg='fuschia5'
          p={1}
          onClick={() => this.changeExampleString('not the default string')}
        >
          change demo string of redux store property to 'not the default string'
        </Button>
        <br/>
        <Button
          bg='pink4'
          p={1}
          onClick={() => this.changeExampleString()}
        >
          change back to default
        </Button>
        <p>
          {/*   Does the 'exampleString' evaluate to an error? 
                Is it loading?    */
            exampleString == 'ERROR' ? 'Heeeey'      : 
            exampleString            ? exampleString : '...loading'
          }
        </p>
        <h2>{ exampleString }</h2>
      </App>
    )
  }
}

function mapStateToProps(state) {
  return {
    exampleString: state.example.payload
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(exampleActions, dispatch);
}

export default connect((state) => ({state}), mapDispatchToProps)(Example);
