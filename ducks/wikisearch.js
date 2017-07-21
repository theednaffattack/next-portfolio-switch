import axios from 'axios';
// import jsonp from 'jsonp';
import jquery from 'jquery';

// CAN'T CURRENTLY SHORTCUT THIS, BE CAREFUL OF NAMES
// ------------------------------------
// Constants
// ------------------------------------
export const GET_WIKI = 'GET_WIKI'
export const GET_WIKI_PENDING = 'GET_WIKI_PENDING'
export const GET_WIKI_FULFILLED = 'GET_WIKI_FULFILLED'
export const GET_WIKI_REJECTED = 'GET_WIKI_REJECTED'

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

// SAVE BELOW UNTIL MORE INFO ABOUT TEMPLATE STRINGS CAN BE FOUND
//&gsrsearch=`;
const GENERATOR_TYPE = 'random';
const SEARCH_FLAG_AND_VALUE = '';
// const API_CLIENT_ID = 'wnt8348cs8c63hibdkiq1ps97prbjv';
const EXAMPLE_API_URI = 'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
const API_URL_BEG = 'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&generator=';
const API_URL_END = '&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max';
// const FULL_API_URL = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&generator=${GENERATOR_TYPE}&prop=info&inprop=url&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max`;

export const getWiki = (dispatch) => {
  // let args = ...
  // const searchValue = searchBoxValue
  const searchOptions = dispatch;

  console.log('Dispatched search options = ' + searchOptions);

  const FULL_API_URL = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&generator=${searchOptions}&prop=info&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max`;
  return (dispatch) => {
    dispatch({ type: GET_WIKI, payload: { FULL_API_URL } })
    jquery.getJSON(FULL_API_URL, function (data) {
      data.length < 0 ? dispatch({ type: GET_WIKI_PENDING, payload: {item1: 'no data!'} }) :
      dispatch({ type: GET_WIKI_PENDING, payload: data })
    })
    .done(function (data) {
      // console.log("second success\n"  + JSON.stringify(data, null, 2));
      dispatch({ type: GET_WIKI_FULFILLED, payload: data })
    })
    .fail(function (err) {
      // console.log("error\n" + JSON.stringify(err, null, 2));
      dispatch({ type: GET_WIKI_REJECTED, payload: err })
    })
    .always(function () {
      console.log("ajax call complete");
    });
  }
}

// export const actions = {
//   getWiki
// }

// ------------------------------------
// Action Handlers
// ------------------------------------
// const ACTION_HANDLERS = {
//   [GET_WIKI]               : (state, action) => state + action.payload,
//   [GET_WIKI_PENDING]       : (state, action) => state + action.payload,
//   [GET_WIKI_FULFILLED]     : (state, action) => [...state, action.payload],
//   [GET_WIKI_REJECTED]      : (state, action) => state + action.payload,
// }

export const wikiInitialState = {
  wiki: {},
};

// ------------------------------------
// Reducer
// ------------------------------------
export default {
  wiki: (state = wikiInitialState, {action}) => {
    switch (action.type) {
      case GET_WIKI:
      // console.log('reducer action')
        return {
          ...state,
          isFetching: true
        }
      case GET_WIKI_PENDING:
        return {
          ...state,
          data: action.payload,
          isFetching: true
        }
      case GET_WIKI_FULFILLED:
        return {
          ...state,
          data: action.payload,
          isFetching: false,
          dataFetched: true
        }
      case GET_WIKI_REJECTED:
        return {
          ...state,
          data: action.payload,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
  }
}