import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Avatar,
  BackgroundImage,
  Box,
  Button,
  Card,
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

  handleStartMainTimer(dispatch) {
    const { startMainClock, pomodoro } = this.props;
    startMainClock(dispatch, pomodoro.clock);
  }

  handleloadBreakClock(dispatch) {
    const { loadBreakClock, pomodoro } = this.props;
    loadBreakClock(dispatch, pomodoro.breakClock);
  }

  handleloadSessionClock(dispatch) {
    const { loadSessionClock, pomodoro } = this.props;
    loadSessionClock(dispatch, pomodoro.sessionClock);
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
      <div style={{ margin: '0 auto' }}>
        <GoldenrodBorderedDiv id="quote-box" className="text-center">
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
          <h3>break: {
            !pomodoro ? ''
            : Math.floor(pomodoro.breakClock/60) % 60 < 1 ? (pomodoro.breakClock % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
            : Math.floor(pomodoro.breakClock/60) % 60 + ' : ' + (pomodoro.breakClock % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
          }</h3>
          <Button onClick={() => this.handleloadBreakClock()}>Load break</Button>
          <Button>+</Button><Button>-</Button>
          <h3>session: {
            !pomodoro ? ''
            : Math.floor(pomodoro.sessionClock/60) % 60 < 1 ? (pomodoro.sessionClock % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
            : Math.floor(pomodoro.sessionClock/60) % 60 + ' : ' + (pomodoro.sessionClock % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
          }</h3>
          <Button onClick={() => this.handleloadSessionClock()}>Load session</Button>
          <Button>+</Button><Button>-</Button>
          <h2>Main<br />
          <em>{
            !pomodoro ? ''
            : Math.floor(pomodoro.clock/60) % 60 < 1 ? (pomodoro.clock % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
            : Math.floor(pomodoro.clock/60) % 60 + ' : ' + (pomodoro.clock % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
          }</em></h2>
        </GoldenrodBorderedDiv>
      </div>
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
    clock: PropTypes.number.isRequired,
  }),
}

export default Pomodoro;
