import { tv  } from '../ducks/tv';
// first: import the constants
import { SET_STRING } from '../actions/exampleActions';

import { GET_CHANNEL, GET_CHANNEL_PENDING, GET_CHANNEL_FULFILLED, GET_CHANNEL_REJECTED } from '../ducks/tv'

// then: import the reducers from withing their duck modules
//   ^ example: const weather = import '../Weather/modules/weather';

const tvInitialState = {
  tv: {},
  dataFetched: false,
  isFetching: false,
  error: false,
};

export default {
  example: (state = {}, { type, payload }) => {
    switch (type) {
      case SET_STRING:
        return {
          ...state, payload
        }
      default:
        return state
    }
  },
  twitch: (state = tvInitialState, { type, payload }) => {
    switch (type) {
      case GET_CHANNEL:
      console.log('reducer action')
        return {
          ...state,
          isFetching: true
        }
      case GET_CHANNEL_PENDING:
        return {
          ...state,
          data: payload,
          isFetching: true
        }
      case GET_CHANNEL_FULFILLED:
        return {
          ...state,
          data: payload,
          isFetching: false,
          dataFetched: true
        }
      case GET_CHANNEL_REJECTED:
        return {
          ...state,
          data: payload,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
  }
}
