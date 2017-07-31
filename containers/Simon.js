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
  Switch,
  Text
} from 'rebass';
import { Col, Row } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import App from '../components/App'
import Gameset from '../components/Gameset'
import  { initGameset, makeChoice, playQueueAnswers, resetGameset }  from '../ducks/simon';

const BoxSimon = styled(Box)`
  border: 2px green solid;
`;

const BorderFlex = styled(Flex)`
  border: 2px goldenrod solid;
`;

const BoxSimonWrapperBlue = styled(Flex)`
  height: 150px;
  width: 150px;
  cursor: pointer;
  border-top-right-radius: 100%;
  background-color: #4a9eda;
  transform: rotate(-90deg);
  &:hover {
    box-shadow: inset 1px 1px 2px rgba(0, 93, 160, 1.0);
  }
  &:active {
    background-color: #0077cc;
  }
`;

const BoxSimonWrapperRed = styled(Flex)`
  height: 150px;
  width: 150px;
  cursor: pointer;
  border-top-right-radius: 100%;
`;

const BoxSimonWrapperYellow = styled(Flex)`
  height: 150px;
  width: 150px;
  cursor: pointer;
  border-top-right-radius: 100%;
  transform: rotate(180deg);
`;

const BoxSimonWrapperGreen = styled(Flex)`
  height: 150px;
  width: 150px;
  cursor: pointer;
  border-top-right-radius: 100%;
  transform: rotate(90deg);
`;

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

  handleGameStart(dispatch) {
    const { resetGameset } = this.props;
    resetGameset()
  }

  handleClick(dispatch) {
    const { makeChoice } = this.props;
    const count = this.props.simon.playCount;
    const guessCount = this.props.simon.choiceset.length;
    const currentComputerChoice = this.props.simon.gameset[count];
    const computerChoiceArray = this.props.simon.gameset
    console.log('Computer Choice\n---------\n' + currentComputerChoice + '\n---------\nPlayer Choice\n---------\n' + dispatch + '\n---------\nGame Count\n---------\n' + count)
    makeChoice(dispatch, count, currentComputerChoice, computerChoiceArray, guessCount)
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
          <Panel bg='yellow' p={3}>
            <h4>Controls</h4>
            <Button onClick={()=>this.handleGameStart()}>Start</Button>
            <Button>Strict</Button>

              <Switch
                // checked={checked}
                onClick={e => update(toggle('checked'))}
              />
                <Pre>{this.props.simon.playCount + 1}</Pre>
          </Panel>
          <BorderFlex wrap mx={-2} p={4} w='400px'>
            <BoxSimonWrapperBlue
              p={4}
              w={[ 1/2 ]}
              bg='blue7'
              color='white'
              style={{backgroundColor: this.props.simon.isPlaying == 'blue' ? '#0077CC' : '#4a9eda'}}
              isActive={this.props.simon.isPlaying == 'blue' ? true : false }
              onClick={()=>this.handleClick('blue')}>

              <Text>Blue</Text>
            </BoxSimonWrapperBlue>
            <BoxSimonWrapperRed
              p={4}
              w={[ 1/2 ]}
              bg='red7'
              color='white'
              style={{backgroundColor: this.props.simon.isPlaying == 'red' ? '#cc0011' : '#ea969d'}}
              onClick={()=>this.handleClick('red')}>

              <Text>Red</Text>
            </BoxSimonWrapperRed>
            <BoxSimonWrapperYellow
              p={4}
              w={[ 1/2 ]}
              bg='yellow7'
              style={{backgroundColor: this.props.simon.isPlaying == 'yellow' ? '#e0d668' : '#f1ecba'}}
              onClick = {()=>this.handleClick('yellow')}>

              <Text>Yellow</Text>
            </BoxSimonWrapperYellow>
            <BoxSimonWrapperGreen
              p={4}
              w={[ 1/2 ]}
              bg='green7'
              style={{backgroundColor: this.props.simon.isPlaying == 'green' ? '#5ea200' : '#77cc00'}}
              onClick={()=>this.handleClick('green')}>

              <Text>Green</Text>
            </BoxSimonWrapperGreen>
          </BorderFlex>
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
    isPlaying: PropTypes.string.isRequired,
    // clickable: PropTypes.bool.isRequired
  }),
  initGameset: PropTypes.func.isRequired,
  resetGameset: PropTypes.func.isRequired,
  makeChoice: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  initGameset,
  makeChoice,
  playQueueAnswers,
  resetGameset
};

const mapStateToProps = (state) => ({
  simon: state.simon,
});

export default connect(mapStateToProps, mapDispatchToProps)(Simon);
