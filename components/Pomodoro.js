import React from 'react';

import { render, findDOMNode } from 'react-dom';
// import ReactTransitionGroup from 'react-addons-transition-group';
import ReactTransitionGroupPlus from '../lib/animates/ReactTransitionGroupPlus';
import animate from 'gsap-promise';
import RadioGroup from 'react-radio-group';
import Animates from '../lib/animates/animates';

import Sound from 'react-sound';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Avatar,
  BackgroundImage,
  Box,
  Button,
  Card,
  Circle,
  Container,
  Flex,
  Heading,
  Panel,
  Pre,
  Small,
  Subhead,
  Text,
} from 'rebass';
// import { getQuotes } from '../ducks/quotes';
import PanelList from './PanelList';
import { Col, Row } from 'react-styled-flexboxgrid';
import styled, { injectGlobal } from 'styled-components';


injectGlobal`

  .animates {
    // position: absolute;
    // top: 0;
    // right: 0;
    // bottom: 0;
    // left: 0;
    margin: auto;
    width: 50px;
    height: 50px;
    color: #000;
  }

  .blue {
    background-color: #00f;
  }

  .red {
    background-color: #f00;
  }

  .green {
    background-color: #008000;
  }

  .orange {
    background-color: #ffa500;
  }

  .purple {
    background-color: #800080;
  }

  .blue {
    background-color: #3498db;
  }

  .red {
    background-color: #b9121b;
  }

  .green {
    background-color: #bedb39;
  }

  .orange {
    background-color: #ffa500;
  }

  .purple {
    background-color: #9768d1;
  }

  .makeTransparent {
    background-color: transparent;
  }

  .demo {
    display: flex;
    height: 100%;
  }

  .control-panel {
    padding: 1em 2.1em;
    display: flex;
    flex-direction: column;
  }

  .control-panel > *:not(:first-child) {
    margin-top: 1em;
  }

  .control-panel h1 {
    font-size: 26px;
    line-height: 0.94;
  }

  .control-panel h1 a {
    color: inherit;
    text-decoration: none;
  }

  .control-panel h1 a:hover {
    color: #dce0f0;
  }

  .control-panel h1 small {
    font-size: 17px;
    color: #adcef0;
    font-style: italic;
  }

  .control-panel legend {
    font-weight: bold;
  }

  .control-panel label {
    display: block;
  }

  .control-panel input[type="range"] {
    display: block;
  }

  .control-panel .radiogroup label {
    display: flex;
    margin-left: -1em;
    margin-right: -1em;
    padding: 0.3em 2em 0.3em 1em;
    align-items: center;
    cursor: pointer;
  }

  .control-panel .radiogroup label:hover {
    background-color: #414363;
  }

  .control-panel .radiogroup span {
    margin-left: 0.3em;
  }

  .control-panel .github-btn {
    border: 0;
  }

  .output-panel {
    background-color: #f5f5fd;
    flex-grow: 1;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .cta-button {
    padding: 1em;
    cursor: pointer;
  }

  .badges {
    position: absolute;
    bottom: 2em;
  }

  .badges > * {
    display: block;
  }

  .badges > *:not(:first-child) {
    margin-top: 1em;
  }
`;

const Thumbnail = styled.img`
  max-width: 100%;
  min-width: 20px;
  height: auto;
`;

const BlinkerCircle = styled(Card)`
  width: 200px;
  animation: blinker 1s linear infinite;

  @keyframes blinker {  
    50% { opacity: 0; }
  }
`;

const CircleCard = styled(Card)`
  // border-radius: 50%;
  // border: 3px solid blue;
`;

const MaxWidthContainer = styled(Container)`
  max-width: 600x;
  width: 600px;
`;

const BorderdCol = styled(Col)`
  border-bottom: 1px solid gray;
`;

const GrayBorder = 'border 1 px solid #eee';

const GrayBorderRow = styled(Row)`
  // border 1px solid #eee;
`;

const GoldenrodBorderAvatar = styled(Avatar)`
  border: 3px solid goldenrod;
  box-shadow: 1px 1px 2px gray;
`;

const GoldenrodBorderedDiv = styled.div`
  border: 3px solid goldenrod;
  box-shadow: 1px 1px 2px gray;
  min-height: 600px;
`;

export class Pomodoro extends React.Component {
  componentDidMount() {
    const {
      pomodoro, 
      incSessionClock,
      decSessionClock,
      incBreakClock,
      decBreakClock,
      pauseMainClock,
      loadBreakClock,
      loadSessionClock,
      startMainClock,
    } = this.props;
    return;
  }

  handleDecBreakClock(dispatch) {
    const { decBreakClock } = this.props;
    decBreakClock(dispatch, 1 * 60);
  }

  handleIncBreakClock(dispatch) {
    const { incBreakClock } = this.props;
    incBreakClock(dispatch, 1 * 60);
  }

  handleDecSessionClock(dispatch) {
    const { decSessionClock } = this.props;
    decSessionClock(dispatch, 1 * 60);
  }

  handleIncSessionClock(dispatch) {
    const { incSessionClock } = this.props;
    incSessionClock(dispatch, 1 * 60);
  }

  handleStartMainTimer(dispatch) {
    const { startMainClock, pomodoro } = this.props;
    startMainClock(dispatch, pomodoro.mainClock, pomodoro.sessionClock);
  }

  handleLoadBreakClock(dispatch) {
    const { loadBreakClock, pomodoro } = this.props;
    loadBreakClock(dispatch, pomodoro.mainClock, pomodoro.breakClock);
  }

  handleLoadSessionClock(dispatch) {
    const { loadSessionClock, pomodoro } = this.props;
    loadSessionClock(dispatch, pomodoro.mainClock, pomodoro.sessionClock);
  }

  render() {
    const {
      pomodoro, 
      incSessionClock,
      decSessionClock,
      incBreakClock,
      decBreakClock,
      pauseMainClock,
      loadBreakClock,
      loadSessionClock,
      startMainClock,
    } = this.props;
    const { mainClock, sessionClock, breakClock } = pomodoro;
    return(
      <MaxWidthContainer>
          <GoldenrodBorderedDiv id="quote-box" className="text-center">
            <h3>break: {
              !pomodoro ? ''
              : Math.floor(pomodoro.breakClock/60) % 60 < 1 ? (pomodoro.breakClock % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
              : Math.floor(pomodoro.breakClock/60) % 60 + ' : ' + (pomodoro.breakClock % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
            }</h3>
            <Button onClick={() => this.handleLoadBreakClock()}>Load break</Button>
            <Button onClick={() => this.handleIncBreakClock(60)} bg='red5'>+</Button><Button onClick={() => this.handleDecBreakClock(60)} bg='green7'>-</Button>
            <h3>session: {
              !pomodoro ? ''
              : Math.floor(pomodoro.sessionClock/60) % 60 < 1 ? (pomodoro.sessionClock % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
              : Math.floor(pomodoro.sessionClock/60) % 60 + ' : ' + (pomodoro.sessionClock % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
            }</h3>
            <Button onClick={() => this.handleLoadSessionClock()}>Load session</Button>
            <Button onClick={() => this.handleIncSessionClock(60)} bg='red5'>+</Button><Button onClick={() => this.handleDecSessionClock(60)} bg='green7'>-</Button>
            <div className="wrapper" >
              <div className="loading-wrapper">
                <div className="loader">
                  <Button onClick={() => this.handleStartMainTimer()}>
                    <i className="fa fa-angle-down"></i> Start Timer
                  </Button>
                  <Button onClick={pauseMainClock}>
                    <i className="fa fa-angle-down"></i> Stop Timer
                  </Button>
                </div>
              </div>
            </div>
            <h2>Main</h2>
            <CircleCard width={100}>
              {
                !pomodoro ? ''
                : Math.floor(pomodoro.mainClock/60) % 60 < 1 ? (pomodoro.mainClock % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                : Math.floor(pomodoro.mainClock/60) % 60 + ' : ' + (pomodoro.mainClock % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
              }
            </CircleCard>
            <ReactTransitionGroupPlus>
              <Animates
                key={mainClock}
                className='makeTransparent'
                enterDuration='0.8'
                leaveDuration='0.3'
              >

                {
                  !pomodoro ? ''
                  : pomodoro.mainClock <= 0
                  ? <BlinkerCircle bg='blue'>
                      Something
                      <Sound
                        url='../static/sounds/win.mp3'
                        playStatus={Sound.status.PLAYING}
                        playFromPosition={300}
                        volume={70}
                        loop={true}
                        onLoading={({bytesLoaded, bytesTotal}) => console.log(`${bytesLoaded / bytesTotal * 100}% loaded`)}
                        onPlaying={({position}) => console.log(position)}
                        onPause={() => console.log('Paused')}
                        onResume={() => console.log('Resumed')}
                        onStop={() => console.log('Stopped')}
                        onFinishedPlaying={() => this.setState({playStatus: Sound.status.STOPPED})} />
                      </BlinkerCircle>
                  : Math.floor(pomodoro.mainClock/60) % 60 < 1 ? (pomodoro.mainClock % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                  : Math.floor(pomodoro.mainClock/60) % 60 + ' : ' + (pomodoro.mainClock % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                }
              </Animates>
            </ReactTransitionGroupPlus>
          </GoldenrodBorderedDiv>
      </MaxWidthContainer>
    )
  }
};

Pomodoro.propTypes = {
  incSessionClock: PropTypes.func.isRequired,
  decSessionClock: PropTypes.func.isRequired,
  incBreakClock: PropTypes.func.isRequired,
  decBreakClock: PropTypes.func.isRequired,
  pauseMainClock: PropTypes.func.isRequired,
  loadBreakClock: PropTypes.func.isRequired,
  loadSessionClock: PropTypes.func.isRequired,
  startMainClock: PropTypes.func.isRequired,
  pomodoro: PropTypes.shape({
    sessionClock: PropTypes.number.isRequired,
    breakClock: PropTypes.number.isRequired,
    mainClock: PropTypes.number.isRequired,
  }),
}

export default Pomodoro;
