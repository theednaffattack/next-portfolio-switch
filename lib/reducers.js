// import wiki from '../ducks/wikisearch';
// import wikiInitialState from '../ducks/wikisearch';
// first: import the constants
import { SET_STRING } from '../actions/exampleActions';

import { GET_CHANNEL, GET_CHANNEL_PENDING, GET_CHANNEL_FULFILLED, GET_CHANNEL_REJECTED } from '../ducks/tv'
import { GET_WIKI, GET_WIKI_PENDING, GET_WIKI_FULFILLED, GET_WIKI_REJECTED } from '../ducks/wikisearch'

// then: import the reducers from withing their duck modules
//   ^ example: const weather = import '../Weather/modules/weather';

const twitchInitialState = {
  streams: [
    {
      esl_sc2: {},
    },{
      ogamingsc2: {},
    },{
      cretetion: {},
    },{
      freecodecamp: {},
    },{
      storbeck: {},
    },{
      habathcx: {},
    },{
      RobotCaleb: {},
    },{
      noobs2ninjas: {},
    },
  ],
  resultStreams: [],
  dataFetched: false,
  isFetching: false,
  error: false,
};

const wikiInitialState = {
  fetchedData: {},
}

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
  twitch: (state = twitchInitialState, { type, payload }) => {
    switch (type) {
      case GET_CHANNEL:
        return {
          ...state,
          isFetching: true
        }
      case GET_CHANNEL_PENDING:
        return {
          ...state,
          resultStreams: payload.streams,
          isFetching: true
        }
      case GET_CHANNEL_FULFILLED:
        return {
          ...state,
          resultStreams: payload.streams,
          isFetching: false,
          dataFetched: true
        }
      case GET_CHANNEL_REJECTED:
        return {
          ...state,
          resultStreams: payload,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
  },
  wiki: (state = wikiInitialState, { type, payload }) => {
    switch (type) {
      case GET_WIKI:
      console.log('initiating action GET_WIKI')
        return {
          ...state,
          isFetching: true
        }
      case GET_WIKI_PENDING:
        console.log('should be success, GET_WIKI_PENDING' + payload)
        return {
          ...state,
          fetchedData: payload,
          isFetching: true
        }
      case GET_WIKI_FULFILLED:
        return {
          ...state,
          fetchedData: payload,
          isFetching: false,
          dataFetched: true
        }
      case GET_WIKI_REJECTED:
        return {
          ...state,
          fetchedData: payload,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
  }
}
