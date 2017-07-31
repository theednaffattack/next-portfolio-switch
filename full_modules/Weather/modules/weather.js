import axios from 'axios';
import {geolocated} from 'react-geolocated';
// CAN'T CURRENTLY SHORTCUT THIS, BE CAREFUL OF NAMES
// ------------------------------------
// Constants
// ------------------------------------
export const GET_WEATHER = 'GET_WEATHER'
export const GET_WEATHER_PENDING = 'GET_WEATHER_PENDING'
export const GET_WEATHER_FULFILLED = 'GET_WEATHER_FULFILLED'
export const GET_WEATHER_REJECTED = 'GET_WEATHER_REJECTED'

export const GET_POSITION = 'GET_POSITION'
export const GET_POSITION_PENDING = 'GET_POSITION_PENDING'
export const GET_POSITION_FULFILLED = 'GET_POSITION_FULFILLED'
export const GET_POSITION_REJECTED = 'GET_POSITION_REJECTED'

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

const WEATHER_API_URL = 'https://api.apixu.com/v1/current.json?key=cb31002097014d48b5d15513170906&q=';

// -----------------------
// EXPERIMENT ZONE vvv
// -----------------------
// from: https://stackoverflow.com/questions/36995628/how-to-implement-promises-with-the-html5-geolocation-api
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
    //You have your locaton here
      console.log("Latitude: " + pos.coords.latitude +
        "Longitude: " + pos.coords.longitude);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
// from: https://stackoverflow.com/questions/36995628/how-to-implement-promises-with-the-html5-geolocation-api

// from: https://gist.github.com/varmais/74586ec1854fe288d393
export const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  });
}

export function geoPositioning (dispatch) {
  return (dispatch) => {
    dispatch({ type: 'GET_POSITION' })
    console.log(getPosition())
    getPosition()
      .then((value) => {
        console.log('Position!!! ' + JSON.stringify(value, null, 2))
        console.log(JSON.stringify(value, null, 2));
        dispatch({ type: 'GET_POSITION_FULFILLED', payload: {value} })
        dispatch(axiosGetWeather())
      })
      .catch((error) => {
        console.error(error.message);
        dispatch({ type: 'GET_POSITION_REJECTED', payload: error })
      });
  }
}
// from: https://gist.github.com/varmais/74586ec1854fe288d393

// from: https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/guides/chaining-actions.md
export const geolocationPromise = () => {
  return dispatch => {
    return dispatch({
      type: 'GET_POSITION',
      payload: getPosition()
    })
    .then(({ value, action }) => {
      console.log(value);
      console.log(action.type)
    })
  }
}
// from: https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/guides/chaining-actions.md

// TODO: adapt solution from:
// https://stackoverflow.com/questions/43692851/react-redux-chaining-a-second-api-request-and-dispatch
// for chained Promise actions

// attempt to chain Promises
// from: https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/guides/chaining-actions.md
export const foo = () => {
  return dispatch => {
    return dispatch({
      type: 'GET_POSITION_AND_WEATHER',
      payload: Promise.all([
        dispatch(geoPositioning()),
        dispatch(axiosGetWeather())
      ])
    });
  };
}
// attempt to chain Promises
// from: https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/guides/chaining-actions.md
// -----------------------
// EXPERIMENT ZONE ^^^
// -----------------------

// export function axiosGetWeather (dispatch) {
//   return (dispatch) => {
//     dispatch({ type: 'GET_WEATHER' })
//     axios.get(WEATHER_API_URL)
//       .then((response) => {
//         dispatch({ type: 'GET_WEATHER_FULFILLED', payload: response.data })
//       })
//       .catch((error) => {
//         dispatch({ type: 'GET_WEATHER_REJECTED', payload: error })
//       })
//   }
// }

export function axiosGetWeather (dispatch, lat, long) {
  const recvdLat = lat;
  const recvdLong = long;
  return (dispatch) => {
    axios.get(WEATHER_API_URL+lat+','+long)
      .then((response) => {
        dispatch({ type: 'GET_WEATHER_FULFILLED', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'GET_WEATHER_REJECTED', payload: error })
      })
  }
}
// Google API to return the city
// http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=true

export const actions = {
  axiosGetWeather
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_WEATHER]    : (state, action) => state + action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
// const initialState = {}
// export default function weatherReducer (state = initialState, action) {
//   const handler = ACTION_HANDLERS[action.type]

//   return handler ? handler(state, action) : state
// }

// From: https://medium.com/react-native-training/redux-4-ways-95a130da0cdc

const initialState = {
  data: [],
  position: {},
  dataFetched: false,
  isFetching: false,
  error: false
}

export default function weatherReducer (state = initialState, action) {
  switch (action.type) {
    case GET_POSITION:
      return {
        ...state,
        isFetching: true
      }
    case GET_POSITION_FULFILLED:
      return {
        ...state,
        position: action.payload,
        isFetching: true
      }
    case GET_WEATHER:
      return {
        ...state,
        data: [],
        position: state.position,
        isFetching: true
      }
    case GET_WEATHER_PENDING:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case GET_WEATHER_FULFILLED:
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
        data: action.payload
      }
    case GET_WEATHER_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
