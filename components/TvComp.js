import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
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
  Text
} from "rebass";
import { getTwitch } from "../ducks/tv";
// import PanelList from './PanelList';
import { Col, Row } from "react-styled-flexboxgrid";
import styled from "styled-components";

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

const GrayBorder = "border 1 px solid #eee";

const GrayBorderRow = styled(Row)`
  // border 1px solid #eee;
`;

const GoldenrodBorderAvatar = styled(Avatar)`
  border: 3px solid goldenrod;
  box-shadow: 1px 1px 2px gray;
`;

export class TvComp extends React.Component {
  render() {
    const { twitch, getTwitch } = this.props;

    const queryList = !twitch
      ? ""
      : !twitch.streams
        ? ""
        : twitch.streams.map(function(stream, index, array) {
            let queryKey = Object.keys(stream)[0];
            queryKey = queryKey.toString().toLowerCase();
            const testForChannelValue = (queryKey, responseField) => {
              for (let i = 0; i < twitch.resultStreams.length; i++) {
                const resultStream = twitch.resultStreams[i];
                const channel = twitch.resultStreams[i].channel;
                if (queryKey === twitch.resultStreams[i].channel.name) {
                  return (
                    <Row>
                      <Col mdOffset={1} xs={2} md={1}>
                        <GoldenrodBorderAvatar src={channel.logo} />
                      </Col>
                      <Col xs={4}>
                        <Text color="green">{channel.display_name}</Text>
                        {resultStream.game}
                        <br />
                        <Small>{resultStream.viewers} viewing</Small>
                      </Col>
                      <Col xs={6}>
                        <a href={channel.url} target="_blank">
                          Visit {channel.display_name}
                        </a>
                      </Col>
                    </Row>
                  ); // END OF RETURN queryKey === twitch.resultStreams[i].channel.name
                }
              }
              return (
                <Row>
                  <Col mdOffset={1} xs={2} md={1}>
                    <GoldenrodBorderAvatar src="http://via.placeholder.com/100x100" />
                  </Col>
                  <Col xs={4}>
                    <Text color="gray7">{queryKey}</Text>
                  </Col>
                  <Col xs={6}>
                    <Text color="gray7">OFFLINE SUCKA</Text>
                  </Col>
                </Row>
              ); // END OF RETURN queryKey === twitch.resultStreams[i].channel.name
            };
            return (
              <Panel key={index}>{testForChannelValue(queryKey, "name")}</Panel>
            );
          }); // end const queryList

    const resultList = !twitch
      ? ""
      : !twitch.resultStreams
        ? ""
        : twitch.resultStreams.map(function(stream, index) {
            return (
              <GrayBorderRow key={index}>
                <BorderdCol xsOffset={1} mdOffset={1} xs={2} md={1}>
                  {/* <GoldenrodBorderAvatar src={stream.channel.logo} /> */}
                </BorderdCol>
                <BorderdCol xs={6}>
                  <Text p={2} color="green">
                    {twitch.resultStreams[index].channel.name}
                  </Text>
                </BorderdCol>
                <BorderdCol xs={3}>eddie</BorderdCol>
              </GrayBorderRow>
            );
          }); // end const resultList

    return (
      <MaxWidthContainer>
        <Heading is="h1">TwitchTV</Heading>
        <Col xs={12}>{queryList}</Col>
      </MaxWidthContainer>
    ); // end return of class TvComp render method
  } // end of class TvComp

  componentDidMount() {
    const { getTwitch } = this.props;
    getTwitch();
  }
}

TvComp.propTypes = {
  twitch: PropTypes.shape({
    streams: PropTypes.array.isRequired
  }),
  getTwitch: PropTypes.func.isRequired
};

export default TvComp;
