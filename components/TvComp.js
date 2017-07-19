import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link';
import { Avatar, BackgroundImage, Box, Button, Card, Container, Flex, Pre, Subhead, Text } from 'rebass'
import { getTwitch } from '../ducks/tv';
import PanelList from './PanelList';
import { Col, Row } from 'react-styled-flexboxgrid';
import styled from 'styled-components';

const Thumbnail = styled.img`
    max-width: 100%;
    min-width: 20px;
    height: auto;
`;

const MaxWidthDivWrap = styled.div`
  max-width: 400x;
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

export class TvComp extends React.Component {
  render() {
    const { twitch, getTwitch } = this.props;

    const queryList =  !twitch ? '' :
                        !twitch.streams ? '' :
      twitch.streams.map(function(stream, index, array){
        let queryKey = Object.keys(stream)[0];
        queryKey = queryKey.toString().toLowerCase()
        const testForValue = (queryKey) => {
          for (var i=0; i < twitch.resultStreams.length; i++) {
            if (queryKey === twitch.resultStreams[i].channel.name){
            return ' - ONLINE' // queryKey === twitch.resultStreams[i].channel.name
            }
          }
          return ' - OFFLINE'
          
        }
        return(
          <GrayBorderRow key={index}>
            <BorderdCol mdOffset={1} xs={2} md={1}>
                {/* <GoldenrodBorderAvatar src={stream.channel.logo} /> */}
            </BorderdCol>
            <BorderdCol xs={4}>
              <Text p={2} color='blue'>
                { queryKey }  
              </Text>
            </BorderdCol>
            <BorderdCol xs={6}>

              
                {testForValue(queryKey)}

            </BorderdCol>
          </GrayBorderRow>
        )
      })
    
    const resultList =  !twitch ? '' :
                        !twitch.resultStreams ? '' :
      twitch.resultStreams.map(function(stream, index){
        return(
          <GrayBorderRow key={index}>
            <BorderdCol xsOffset={1} mdOffset={1} xs={2} md={1}>
              {/* <GoldenrodBorderAvatar src={stream.channel.logo} /> */}
            </BorderdCol>
            <BorderdCol xs={6}>
              <Text p={2} color='green'>
                {twitch.resultStreams[index].channel.name}  
              </Text>
            </BorderdCol>
            <BorderdCol xs={3}>eddie</BorderdCol>
          </GrayBorderRow>
        )
      })

    return (
      <Container>
        <Col xs={12}>
          {queryList}
        </Col>
      </Container>
    )
  }

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
}

export default TvComp;
