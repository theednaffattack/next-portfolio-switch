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
import Gameset from '../components/Gameset'
import  { initGameset, makeChoice, playQueueAnswers }  from '../ducks/simon';

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
  }

  componentDidMount() {
    const { initGameset, dispatch, simon  } = this.props;
    const { gameErrors  } = this.props.simon;
    
    if (this.props.simon.gameset.length < 1) {
      initGameset(); 
    } 
    return;
  } 

  playSeq = (dispatch) => {
    const sequence = dispatch;
    let i = 0;   
    for (let i=0; i < sequence.length; i++){
      playQueueAnswer(sequence[i])
    }
  };

  handleClick(dispatch) {
    const { makeChoice } = this.props;
    const count = this.props.simon.playCount;
    const guessCount = this.props.simon.choiceset.length;
    const currentComputerChoice = this.props.simon.gameset[count];
    const computerChoiceArray = this.props.simon.gameset
    console.log('Computer Choice\n---------\n' + currentComputerChoice + '\n---------\nPlayer Choice\n---------\n' + dispatch + '\n---------\nGame Count\n---------\n' + count)
    makeChoice(dispatch, count, currentComputerChoice, computerChoiceArray, guessCount)
    
    // playSeq(computerChoiceArray)
  }

  render() {
  const { simon, makeChoice, gameManager } = this.props;

  const gamesetArray = !simon ? '' :
                !simon.gameset ? '' :
                simon.gameset.map(function(tone, index) {
                  return (<span key={index}>No {index + 1} - {tone} || </span>);
                });

  const choiceArray = 
                !simon ? '' :
                !simon.choiceset ? '' :
                simon.choiceset.map(function(tone, index) {
                  return (<span key={index}>No {index + 1} - {tone} || </span>);
                }) 
                !simon ? '' :
                !simon.gameErrors ? '' :
                simon.gameErrors.length > 0 ? <Text color='red'>{simon.gameErrors}</Text> : ''

  const clickVal = [];
    
  const clickStore = clickVal.map(function(eachClick) {
    return console.log("<Text color='purple'>eachClick</Text>")
  }, this)
    
    return (
      <App title="WikiSearch page">
        <Container>
          <Panel bg='gray3' p={3}>
            <h4>Computer Choices</h4>
            { gamesetArray }
          </Panel>
          <Panel bg='blue3' p={3}>
            <h4>Player Choices</h4>
            { choiceArray }
          </Panel>
          <Flex wrap mx={-2} p={4}>
            <BoxSimonWrapper p={4} w={[ 1/2 ]}>
              <Button
                p={4}
                m='auto'
                w={[ 1, 1/5 ]}
                color='gray1'
                bg='blue'
                value='blue'
                onClick={()=>this.handleClick('blue')}>Blue</Button>
                <Pre>{this.props.simon.playCount + 1}</Pre>
            </BoxSimonWrapper>
            <BoxSimonWrapper p={4} w={[ 1/2 ]}>
              <Button
                p={4}
                m='auto'
                w={[ 1, 1/5 ]}
                color='gray1'
                bg='red'
                value='red'
                onClick={()=>this.handleClick('red')}>Red</Button>
            </BoxSimonWrapper>
            <BoxSimonWrapper p={4} w={[ 1/2 ]}>
              <Button
                p={4}
                m='auto'
                w={[ 1, 1/5 ]}
                color='gray8'
                bg='yellow4'
                value='yellow'
                onClick = {()=>this.handleClick('yellow')}>Yellow</Button>
            </BoxSimonWrapper>
            <BoxSimonWrapper p={4} w={[ 1/2 ]}>
              <Button
                p={4}
                m='auto'
                w={[ 1, 1/5 ]}
                color='gray9'
                bg='green'
                value='green'
                onClick={()=>this.handleClick('green')}>Green</Button>
            </BoxSimonWrapper>
          </Flex>
        </Container>
      </App>  
    )
  }
}

Simon.propTypes = {
  simon: PropTypes.shape({
    gameset: PropTypes.array.isRequired,
    playCount: PropTypes.number.isRequred,
    gameErrors: PropTypes.string.isRequired,
    choiceset: PropTypes.array.isRequred,
  }),
  initGameset: PropTypes.func.isRequired,
  makeChoice: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  initGameset,
  makeChoice,
  playQueueAnswers,
};

const mapStateToProps = (state) => ({
  simon: state.simon,
});

export default connect(mapStateToProps, mapDispatchToProps)(Simon);
