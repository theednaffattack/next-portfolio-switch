import React from 'react';

import { render, findDOMNode } from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';
import ReactTransitionGroupPlus from '../lib/ReactTransitionGroupPlus.js';
import animate from 'gsap-promise';
import RadioGroup from 'react-radio-group';

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
import styled from 'styled-components';

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
            <CircleCard width={100}>{
              !pomodoro ? ''
              : Math.floor(pomodoro.mainClock/60) % 60 < 1 ? (pomodoro.mainClock % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
              : Math.floor(pomodoro.mainClock/60) % 60 + ' : ' + (pomodoro.mainClock % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
            }</CircleCard>
          </GoldenrodBorderedDiv>
          {pomodoro.mainClock <= 0 ? <BlinkerCircle bg='blue'>Something</BlinkerCircle> : ''}
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
