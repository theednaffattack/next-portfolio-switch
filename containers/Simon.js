import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
} from "rebass";
import { Col, Row } from "react-styled-flexboxgrid";
import styled from "styled-components";
import ReactTransitionGroupPlus from "../lib/animates/ReactTransitionGroupPlus";

import App from "../components/App";
import Gameset from "../components/Gameset";
import simonSVG from "../static/simonOptimized.svg";
import simonSVG2 from "./simonLarge.svg";
import {
  initGameset,
  makeChoice,
  playQueueAnswers,
  resetGameset,
  disableClicks,
  enableClicks,
  toggleGameMode,
  toggleGameOnOff
} from "../ducks/simon";

const SvgComponent = () => <simonSVG />;
const SvgComponent2 = () => <simonSVG2 />;

const BoxSimon = styled(Box)`
  border: 2px green solid;
`;

const BorderFlex = styled(Flex)`
  border: 2px goldenrod solid;
`;

const bgColorBlue = "#4a9eda";
const bgColorRed = "#ea969d";
const bgColorYellow = "#f1ecba";
const bgColorGreen = "#84e47b";
const highlightColorBlue = "#0077cc";
const highlightColorRed = "#cc0011";
const highlightColorYellow = "#e0d668";
const highlightColorGreen = "#11cc00";

const BoxSimonWrapperBlue = styled(Flex)`
  height: 150px;
  width: 150px;
  border: 8px grey solid;
  clickable: ${props => (props.clickable ? props.clickable : false)};
  cursor: ${props => (props.clickable ? "pointer" : "none")};
  pointer-events: ${props => (props.clickable ? "auto" : "none")};
  border-top-left-radius: 100%;
  background-color: ${bgColorBlue};
  &:active {
    background-color: ${highlightColorBlue};
  }
  &.active {
    background-color: ${highlightColorBlue};
  }
`;

const BoxSimonWrapperRed = styled(Flex)`
  height: 150px;
  width: 150px;
  border: 8px grey solid;
  clickable: ${props => (props.clickable ? props.clickable : false)};
  cursor: ${props => (props.clickable ? "pointer" : "none")};
  pointer-events: ${props => (props.clickable ? "auto" : "none")};
  border-top-right-radius: 100%;
  background-color: ${bgColorRed};
  &:active {
    background-color: ${highlightColorRed};
  }
  &.active {
    background-color: ${highlightColorRed};
  }
`;

const BoxSimonWrapperYellow = styled(Flex)`
  height: 150px;
  width: 150px;
  border: 8px grey solid;
  clickable: ${props => (props.clickable ? props.clickable : false)};
  cursor: ${props => (props.clickable ? "pointer" : "none")};
  pointer-events: ${props => (props.clickable ? "auto" : "none")};
  border-bottom-left-radius: 100%;
  background-color: ${bgColorYellow};
  &:active {
    background-color: ${highlightColorYellow};
  }
  &.active {
    background-color: ${highlightColorYellow};
  }
`;

const BoxSimonWrapperGreen = styled(Flex)`
  height: 150px;
  width: 150px;
  border: 8px grey solid;
  clickable: ${props => (props.clickable ? props.clickable : false)};
  cursor: ${props => (props.clickable ? "pointer" : "none")};
  pointer-events: ${props => (props.clickable ? "auto" : "none")};
  border-bottom-right-radius: 100%;
  background-color: ${bgColorGreen};
  &:active {
    background-color: ${highlightColorGreen};
  }
  &.active {
    background-color: ${highlightColorGreen};
  }
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
    const { initGameset, dispatch, simon, clickable } = this.props;
    console.log(this.props);
    const { gameErrors } = this.props.simon;

    // if (this.props.simon.gameset.length < 1) {
    //   initGameset();
    // }
    return;
  }

  playSeq = dispatch => {
    const sequence = dispatch;
    let i = 0;
    for (let i = 0; i < sequence.length; i++) {
      playQueueAnswer(sequence[i]);
    }
  };

  handleGameStart(dispatch) {
    const { resetGameset } = this.props;
    resetGameset();
  }

  handleToggleGameMode(dispatch) {
    const { toggleGameMode } = this.props;
    const oppoMode = this.props.simon.mode == "easy" ? "strict" : "easy";
    toggleGameMode(dispatch, oppoMode);
    console.log("strict toggle " + oppoMode);
  }

  handleToggleGameOnOff(dispatch) {
    const { toggleGameOnOff, initGameset } = this.props;
    const onOff = this.props.simon.onOff == false ? true : false;
    const clickable = onOff == true ? true : false;
    toggleGameOnOff(dispatch, onOff, clickable);
    if (onOff == true) {
      initGameset();
    }
    console.log("power toggle " + JSON.stringify(onOff, null, 2));
    console.log("clickable state " + JSON.stringify(clickable, null, 2));
  }

  handleClick(dispatch) {
    const { makeChoice } = this.props;
    const count = this.props.simon.playCount;
    const guessCount = this.props.simon.choiceset.length;
    const currentComputerChoice = this.props.simon.gameset[count];
    const computerChoiceArray = this.props.simon.gameset;
    const mode = this.props.simon.mode;
    console.log(
      "Computer Choice\n---------\n" +
        currentComputerChoice +
        "\n---------\nPlayer Choice\n---------\n" +
        dispatch +
        "\n---------\nGame Count\n---------\n" +
        count
    );
    makeChoice(
      dispatch,
      count,
      currentComputerChoice,
      computerChoiceArray,
      guessCount,
      mode
    );
  }

  render() {
    const { simon, makeChoice, gameManager, clickable } = this.props;

    const gamesetArray = !simon
      ? ""
      : !simon.gameset
        ? ""
        : simon.gameset.map(function(tone, index) {
            return (
              <span key={index}>
                No {index + 1} - {tone} ||{" "}
              </span>
            );
          });

    const choiceArray = !simon
      ? ""
      : !simon.choiceset
        ? ""
        : simon.choiceset.map(function(tone, index) {
            return (
              <span key={index}>
                No {index + 1} - {tone} ||{" "}
              </span>
            );
          });
    !simon ? (
      ""
    ) : !simon.gameErrors ? (
      ""
    ) : simon.gameErrors.length > 0 ? (
      <Text color="red">{simon.gameErrors}</Text>
    ) : (
      ""
    );

    const clickVal = [];

    const clickStore = clickVal.map(function(eachClick) {
      return console.log("<Text color='purple'>eachClick</Text>");
    }, this);

    return (
      <App title="Simon">
        <Container>
          <Panel bg="gray3" p={3}>
            <h4>Computer Choices</h4>
            {gamesetArray}
          </Panel>
          <Panel bg="blue3" p={3}>
            <h4>Player Choices</h4>
            {choiceArray}
          </Panel>
          <Panel bg="yellow" p={3}>
            <h4>Controls</h4>
            <Button onClick={() => this.handleGameStart()}>Start</Button>
            <Button onClick={() => this.handleToggleGameMode()}>Strict</Button>

            <Switch
              checked={this.props.simon.onOff}
              onClick={() => this.handleToggleGameOnOff()}
            />
            <Text fontSize={5}>{this.props.simon.playCount + 1}</Text>
            <Text fontSize={5}>{this.props.simon.mode}</Text>
          </Panel>
          <BorderFlex wrap mx={-2} p={4} w="1000px">
            <SvgComponent />
            <svg
              height="650"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 486.04 486.09"
            >
              <circle cx="242.94" cy="243.03" r="242.86" fill="#333" />
              <circle
                cx="242.94"
                cy="243.03"
                r="139.1"
                fill="#333"
                data-name="Control Ring Outer Matte Ring"
              />
              <g data-name="Control Ring Inner">
                <circle
                  cx="242.94"
                  cy="243.03"
                  r="118.05"
                  fill="#eee"
                  data-name="Inner BG"
                />
                <text
                  fill="#333"
                  fontFamily="Phosphate-Inline,Phosphate"
                  fontSize="48"
                  transform="translate(174.52 211.74)"
                >
                  Simon
                </text>
              </g>
              <g data-name="Count Box">
                <g data-name="Count Group">
                  <rect
                    width="60.27"
                    height="36.36"
                    x="168.06"
                    y="230.24"
                    fill="#222"
                    data-name="Display Matte"
                    rx="12"
                    ry="12"
                  />
                  <rect
                    width="53.38"
                    height="32.21"
                    x="171.51"
                    y="232.32"
                    fill="#32050c"
                    data-name="Display BG"
                    rx="12"
                    ry="12"
                  />
                  <text
                    fill="#500"
                    fontFamily="VT323-Regular,VT323"
                    fontSize="33.161"
                    letter-spacing="-.005em"
                    transform="matrix(1.45 0 0 1 178.78 257.95)"
                  >
                    01
                  </text>
                  <text
                    fill="#dc0d29"
                    fontFamily="VT323-Regular,VT323"
                    fontSize="33.161"
                    letter-spacing="-.005em"
                    transform="matrix(1.45 0 0 1 178.78 257.95)"
                  >
                    01
                  </text>
                </g>
                <text
                  fontFamily="Oswald-Light,Oswald"
                  fontSize="10"
                  transform="translate(186.04 281.27)"
                >
                  COUNT
                </text>
                <text
                  fontFamily="Oswald-Light,Oswald"
                  fontSize="10"
                  transform="translate(240.04 281.27)"
                >
                  S<tspan x="4.6" y="0" letter-spacing="-.025em">
                    T
                  </tspan>
                  <tspan x="8.49" y="0">
                    A
                  </tspan>
                  <tspan x="13.26" y="0" letter-spacing="-.01em">
                    R
                  </tspan>
                  <tspan x="18.28" y="0">
                    T
                  </tspan>
                </text>
                <text
                  fontFamily="Oswald-Light,Oswald"
                  fontSize="10"
                  transform="translate(274.04 281.27)"
                >
                  STRICT
                </text>
              </g>
              <g data-name="On Off Toggle">
                <rect
                  checked={this.props.simon.onOff}
                  onClick={() => this.handleToggleGameOnOff()}
                  id="switch"
                  width="38.66"
                  height="20.67"
                  x="223.04"
                  y="299.94"
                  rx="3"
                  ry="3"
                />
                <text
                  fontFamily="Oswald-Light,Oswald"
                  fontSize="10"
                  transform="translate(202.38 314.94)"
                >
                  OFF
                </text>
                <text
                  fontFamily="Oswald-Light,Oswald"
                  fontSize="10"
                  transform="translate(267.38 314.94)"
                >
                  ON
                </text>
                <rect
                  onClick={() => this.handleGameStart()}
                  width="14.37"
                  height="15.88"
                  x="225.67"
                  y="302.1"
                  fill="#0090df"
                  rx="2"
                  ry="2"
                />
              </g>
              <g data-name="Active Buttons">
                <path
                  fill="#fed93f"
                  d="M108.63 279.32H21.82a224.21 224.21 0 0 0 186.93 185.17v-86.61a139.33 139.33 0 0 1-100.12-98.56z"
                  data-name="Lower Left"
                />
                <path
                  fill="#1c8cff"
                  d="M278.67 377.48v86.76a224.24 224.24 0 0 0 185.39-184.92h-86.82a139.34 139.34 0 0 1-98.57 98.16z"
                  data-name="Lower Right"
                />
                <path
                  fill="#ff4c4c"
                  d="M377.93 209.4h86.55A224.21 224.21 0 0 0 278.67 21.81v86.76a139.31 139.31 0 0 1 99.26 100.83z"
                  data-name="Upper right"
                />
                <path
                  fill="#13ff7c"
                  d="M208.75 108.17V21.56A224.2 224.2 0 0 0 21.39 209.4h86.55a139.31 139.31 0 0 1 100.81-101.23z"
                  data-name="Uppler Left"
                />
              </g>
              <g data-name="Strict LED">
                <circle
                  cx="286.21"
                  cy="228.94"
                  r="4.17"
                  fill="#333"
                  data-name="Outer Matte"
                />
                <circle
                  cx="286.21"
                  cy="228.94"
                  r="2.67"
                  fill="#8a1700"
                  data-name="Inner Light Inert"
                />
                <circle
                  cx="286.21"
                  cy="228.94"
                  r="2.67"
                  fill="#df0000"
                  data-name="Inner Light Active"
                />
              </g>
              <g data-name="Strict Button">
                <circle
                  cx="285.71"
                  cy="247.94"
                  r="12"
                  fill="#333"
                  data-name="Outer Matte"
                />
                <circle
                  cx="285.71"
                  cy="247.94"
                  r="8"
                  fill="#dfbb00"
                  data-name="Inner Button"
                />
              </g>
              <g data-name="Start Button">
                <circle
                  cx="251.04"
                  cy="247.94"
                  r="12"
                  fill="#333"
                  data-name="Outer Matte"
                />
                <circle
                  cx="251.04"
                  cy="247.94"
                  r="8"
                  fill="#df0000"
                  data-name="Inner Button"
                />
              </g>
              <g data-name="Inert Buttons">
                <path
                  fill="#cca707"
                  d="M108.63 279.32H21.82a224.21 224.21 0 0 0 186.93 185.17v-86.61a139.33 139.33 0 0 1-100.12-98.56z"
                  data-name="Lower Left"
                />
                <path
                  fill="#094a8f"
                  d="M278.67 377.48v86.76a224.24 224.24 0 0 0 185.39-184.92h-86.82a139.34 139.34 0 0 1-98.57 98.16z"
                  data-name="Lower Right"
                />
                <path
                  fill="#9f0f17"
                  d="M377.93 209.4h86.55A224.21 224.21 0 0 0 278.67 21.81v86.76a139.31 139.31 0 0 1 99.26 100.83z"
                  data-name="Upper right"
                />
                <path
                  fill="#00a74a"
                  d="M208.75 108.17V21.56A224.2 224.2 0 0 0 21.39 209.4h86.55a139.31 139.31 0 0 1 100.81-101.23z"
                  data-name="Uppler Left"
                />
              </g>
            </svg>
          </BorderFlex>
          <BorderFlex wrap mx={-2} p={4} w="400px">
            <BoxSimonWrapperBlue
              p={4}
              w={[1 / 2]}
              color="white"
              style={{
                backgroundColor:
                  this.props.simon.isPlaying == "blue"
                    ? highlightColorBlue
                    : bgColorBlue
              }}
              clickable={this.props.simon.clickable}
              data-isActive={
                this.props.simon.isPlaying == "blue" ? true : false
              }
              onClick={() => this.handleClick("blue")}
            >
              <Text>Blue</Text>
            </BoxSimonWrapperBlue>
            <BoxSimonWrapperRed
              p={4}
              w={[1 / 2]}
              color="white"
              style={{
                backgroundColor:
                  this.props.simon.isPlaying == "red"
                    ? highlightColorRed
                    : bgColorRed
              }}
              clickable={this.props.simon.clickable}
              onClick={() => this.handleClick("red")}
            >
              <Text>Red</Text>
            </BoxSimonWrapperRed>
            <BoxSimonWrapperYellow
              p={4}
              w={[1 / 2]}
              style={{
                backgroundColor:
                  this.props.simon.isPlaying == "yellow"
                    ? highlightColorYellow
                    : bgColorYellow
              }}
              clickable={this.props.simon.clickable}
              onClick={() => this.handleClick("yellow")}
            >
              <Text>Yellow</Text>
            </BoxSimonWrapperYellow>
            <BoxSimonWrapperGreen
              p={4}
              w={[1 / 2]}
              style={{
                backgroundColor:
                  this.props.simon.isPlaying == "green"
                    ? highlightColorGreen
                    : bgColorGreen
              }}
              clickable={this.props.simon.clickable}
              onClick={() => this.handleClick("green")}
            >
              <Text>Green</Text>
            </BoxSimonWrapperGreen>
          </BorderFlex>
        </Container>
      </App>
    );
  }
}

Simon.propTypes = {
  simon: PropTypes.shape({
    gameset: PropTypes.array.isRequired,
    playCount: PropTypes.number.isRequred,
    gameErrors: PropTypes.string.isRequired,
    choiceset: PropTypes.array.isRequred,
    clickable: PropTypes.bool.isRequired,
    isPlaying: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    onOff: PropTypes.bool.isRequred
  }),
  initGameset: PropTypes.func.isRequired,
  resetGameset: PropTypes.func.isRequired,
  makeChoice: PropTypes.func.isRequired,
  toggleGameMode: PropTypes.func.isRequired,
  toggleGameOnOff: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  initGameset,
  makeChoice,
  playQueueAnswers,
  resetGameset,
  disableClicks,
  enableClicks,
  toggleGameMode,
  toggleGameOnOff
};

const mapStateToProps = state => ({
  simon: state.simon
});

export default connect(mapStateToProps, mapDispatchToProps)(Simon);
