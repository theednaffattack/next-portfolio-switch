import axios from 'axios';
import jsonp from 'jsonp';
import jquery from 'jquery';

// CAN'T CURRENTLY SHORTCUT THIS, BE CAREFUL OF NAMES
// ------------------------------------
// Constants
// ------------------------------------
export const GET_CHANNEL = 'GET_CHANNEL'
export const GET_CHANNEL_PENDING = 'GET_CHANNEL_PENDING'
export const GET_CHANNEL_FULFILLED = 'GET_CHANNEL_FULFILLED'
export const GET_CHANNEL_REJECTED = 'GET_CHANNEL_REJECTED'

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

// create an array of channels to loop over
const channels = ['freecodecamp', 'test_channel', 'ESL_SC2'];

// create a function that will:
//  1 - create a function to retrieve all channel and stream info based on the 'channels' array
function getChannelInfo () {
  //do stuff here
  channels.forEach(function(channel) {
    function makeUrl (type, name) {
      return `https://wind-bow.gomix.me/twitch-api/${type}/${name}?callback=?`
    }
    jsonp(makeUrl('streams', name), null, function (err, data) {
      if (err) {
        console.error(err.message);
        dispatch({ type: 'GET_CHANNEL_REJECTED', payload: err })
      } else {
        console.log(data);
        dispatch({ type: 'GET_CHANNEL_FULFILLED', payload: data })
      }
    });
  });
}

function getStreamInfo () {
  // do stuff
}
//    a - create a makeURL function to take a channels type and name and spit a URI
//    

//    b - create the get function to call makeURL and return with info from the API
//  2 - use the channel info to create 'stream' information for each channel

// const API_URL = 'https://wind-bow.gomix.me/twitch-api/streams/freecodecamp';
const API_URL = 'https://wind-bow.gomix.me/twitch-api/streams/ESL_SC2?callback=?';

const apiStreams = 'streams/';

// only the routes below work for Twitch TV
//  /users/:user,
//  /channels/:channel, and
//  /streams/:stream
//  ESL_SC2
//  
//  https://wind-bow.gomix.me/twitch-api/streams/ESL_SC2

export const getJson = (dispatch) => {
  return (dispatch) => {
    let data = jsonp(API_URL).promise;
    console.log("SENDING REQUEST");
  }
}

export const requestTwitch = (dispatch) => {
  return (dispatch) => {
    axios.get(API_URL)
      .then((response) => {
        dispatch({ type: 'GET_CHANNEL_FULFILLED', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'GET_CHANNEL_REJECTED', payload: error })
      });
  }
}

export const getTwitch = (dispatch) => {
  return (dispatch) => {
    dispatch({ type: 'GET_CHANNEL', payload: {}})
    // jquery.getJSON(API_URL, null, function (err, data) {
    //     if (err) {
    //       console.error(err.message);
    //       dispatch({ type: 'GET_CHANNEL_REJECTED', payload: err })
    //     } else {
    //       console.log(data);
    //       dispatch({ type: 'GET_CHANNEL_FULFILLED', payload: data })
    //     }
    // });
    jquery.getJSON(API_URL, function (data) {
      console.log("success" + data);
      dispatch({ type: 'GET_CHANNEL', payload: data })
    })
    .done(function (data) {
      console.log("second success"  + data);
      dispatch({ type: 'GET_CHANNEL_FULFILLED', payload: data })
    })
    .fail(function () {
      console.log("error");
      dispatch({ type: 'GET_CHANNEL_REJECTED', payload: err })
    })
    .always(function () {
      console.log("complete");
    });
  }
}

// const jqxhr = jquery.getJSON( API_URL, function(data) {
//   console.log( "success" + data);
//   dispatch({ type: 'GET_CHANNEL', payload: data })
// })
//   .done(function() {
//     console.log( "second success"  + data);
//     dispatch({ type: 'GET_CHANNEL_FULFILLED', payload: data })
//   })
//   .fail(function() {
//     console.log( "error" );
//     dispatch({ type: 'GET_CHANNEL_REJECTED', payload: err })
//   })
//   .always(function() {
//     console.log( "complete" );
//   });
 
// // Perform other work here ...
 
// // Set another completion function for the request above
// jqxhr.complete(function() {
//   console.log( "second complete" );
// });

export function requestChannel (dispatch) {
  return (dispatch) => {
    dispatch({ type: 'GET_CHANNEL' })
    getPosition()
      .then((position) => {
        console.log('Position!!!')
        console.log(JSON.stringify(position.coords, null, 2));
        dispatch({ type: 'GET_CHANNEL_FULFILLED', payload: {position} })
        dispatch(axiosGetChannel())
      })
      .catch((error) => {
        console.error(error.message);
        dispatch({ type: 'GET_CHANNEL_REJECTED', payload: error })
      });
  }
}

export function axiosGetChannel (dispatch) {
  return (dispatch) => {
    axios.get(API_URL)
      .then((response) => {
        dispatch({ type: 'GET_WEATHER_FULFILLED', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'GET_WEATHER_REJECTED', payload: error })
      })
  }
}

export const actions = {
  axiosGetChannel
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_CHANNEL]               : (state, action) => state + action.payload,
  [GET_CHANNEL_PENDING]       : (state, action) => state + action.payload,
  [GET_CHANNEL_FULFILLED]     : (state, action) => [...state, action.payload],
  [GET_CHANNEL_REJECTED]      : (state, action) => state + action.payload,
}

const initialState = {
  data: [],
  tv: {},
  dataFetched: false,
  isFetching: false,
  error: false
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function tvReducer (state = initialState, action) {
  switch (action.type) {
    case GET_CHANNEL:
      return {
        ...state,
        isFetching: true
      }
    case GET_CHANNEL_PENDING:
      return {
        ...state,
        data: action.payload,
        isFetching: true
      }
    case GET_CHANNEL_FULFILLED:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        dataFetched: true
      }
    case GET_CHANNEL_REJECTED:
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
