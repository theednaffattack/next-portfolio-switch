import React from 'react'
import PropTypes from 'prop-types'
import './Quotes.scss'

export const Quotes = ({ requestQuote, quotes }) => (
  <div style={{ margin: '0 auto' }} >
    <div id="quote-box" className="text-center">
      <div className="wrapper" >
        <div className="loading-wrapper">
          <div className="loader">
            <div className="inner" onClick={requestQuote} role="button"><i className="fa fa-angle-down"></i></div>
          </div>
        </div>
      </div>
      <h4 className="display-h-medium"><em>{quotes.data.data ? quotes.data.data[0].quote : ''}</em></h4>
        <h3 id="quote-content">{quotes.data.data ? quotes.data.data[0].author : ''}</h3>
    </div>
  </div>
)
Quotes.propTypes = {
  requestQuote: PropTypes.func.isRequired,
  quotes: PropTypes.object.isRequired
}

export default Quotes
