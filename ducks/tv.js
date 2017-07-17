import axios from 'axios';
// import jsonp from 'jsonp';
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
const channel1 = 'castro_1021';
const channelArray = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
]
const channel = channelArray[0];
const API_CLIENT_ID = 'wnt8348cs8c63hibdkiq1ps97prbjv';
const API_URL = `https://api.twitch.tv/kraken/streams/${channel}?client_id=${API_CLIENT_ID}`;

// https://api.twitch.tv/kraken/channels/twitch?client_id=axjhfp777tflhy0yjb5sftsil
// https://api.twitch.tv/kraken/channels/44322889
// https://api.twitch.tv/kraken/streams/
const apiStreams = 'streams/';

// only the routes below work for Twitch TV
//  /users/:user,
//  /channels/:channel, and
//  /streams/:stream
//  ESL_SC2
//  
//  https://wind-bow.gomix.me/twitch-api/streams/ESL_SC2


export const getTwitch = (dispatch) => {
  return (dispatch) => {
    // dispatch({ type: GET_CHANNEL, payload: {}})

    jquery.getJSON(API_URL, function (data) {
      console.log("success\n" + JSON.stringify(data, null, 2));
      dispatch({ type: GET_CHANNEL_PENDING, payload: data })
    })
    .done(function (data) {
      console.log("second success\n"  + JSON.stringify(data, null, 2));
      dispatch({ type: GET_CHANNEL_FULFILLED, payload: data })
    })
    .fail(function (err) {
      console.log("error\n" + JSON.stringify(err, null, 2));
      dispatch({ type: GET_CHANNEL_REJECTED, payload: err })
    })
    .always(function () {
      console.log("complete");
    });
  }
}



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
// const ACTION_HANDLERS = {
//   [GET_CHANNEL]               : (state, action) => state + action.payload,
//   [GET_CHANNEL_PENDING]       : (state, action) => state + action.payload,
//   [GET_CHANNEL_FULFILLED]     : (state, action) => [...state, action.payload],
//   [GET_CHANNEL_REJECTED]      : (state, action) => state + action.payload,
// }

const initialState = {
  tv: {},
  dataFetched: false,
  isFetching: false,
  error: false,
};


// export default {
//   example: (state = {}, { type, payload }) => {
//     switch (type) {
//       case 'EXAMPLE_ACTION':
//         return {
//           ...state, payload
//         }
//       default:
//         return state
//     }
//   }
// }

// ------------------------------------
// Reducer
// ------------------------------------
export default {
  tv: (state = initialState, {action}) => {
    switch (action.type) {
      case GET_CHANNEL:
      console.log('reducer action')
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
}