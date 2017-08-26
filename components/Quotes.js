import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link';
import { Avatar, BackgroundImage, Box, Button, Card, Container, Flex, Heading, Panel, Pre, Small, Subhead, Text } from 'rebass'
import { getQuotes } from '../ducks/quotes';
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

export const Quotes = ({ requestQuote, quotes }) => (
  <div style={{ margin: '0 auto' }} >
    <GoldenrodBorderedDiv id="quote-box" className="text-center">
      <div className="wrapper" >
        <div className="loading-wrapper">
          <div className="loader">
            <Button onClick={requestQuote}>
              <i className="fa fa-angle-down"></i> Get Quote
            </Button>
          </div>
        </div>
      </div>
      <h3><em>{quotes.data.data ? quotes.data.data[0].quote : ''}</em></h3>
      <h4 id="quote-content">{quotes.data.data ? quotes.data.data[0].author : ''}</h4>
    </GoldenrodBorderedDiv>
  </div>
)
Quotes.propTypes = {
  requestQuote: PropTypes.func.isRequired,
  quotes: PropTypes.shape({
    data: PropTypes.object.isRequired
  }),
}

export default Quotes


