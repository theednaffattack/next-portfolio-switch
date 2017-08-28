// import wiki from '../ducks/wikisearch';
// import wikiInitialState from '../ducks/wikisearch';
// import weatherReducer from '../full_modules/Weather/modules/weather';
// first: import the constants
import { SET_STRING } from '../actions/exampleActions';

import { GET_CHANNEL, GET_CHANNEL_PENDING, GET_CHANNEL_FULFILLED, GET_CHANNEL_REJECTED } from '../ducks/tv';
import { GET_WIKI, GET_WIKI_PENDING, GET_WIKI_FULFILLED, GET_WIKI_REJECTED } from '../ducks/wikisearch';
import { GET_WEATHER, GET_WEATHER_PENDING, GET_WEATHER_FULFILLED, GET_WEATHER_REJECTED } from '../full_modules/Weather/modules/weather';
import { GET_POSITION, GET_POSITION_PENDING, GET_POSITION_FULFILLED, GET_POSITION_REJECTED } from '../full_modules/Weather/modules/weather';

// ------------------------------------
// Constants
// ------------------------------------
const GET_QUOTE = 'GET_QUOTE';
const GET_QUOTE_PENDING = 'GET_QUOTE_PENDING';
const GET_QUOTE_FULFILLED = 'GET_QUOTE_FULFILLED';
const GET_QUOTE_REJECTED = 'GET_QUOTE_REJECTED';

const START_MAIN_CLOCK = 'START_MAIN_CLOCK';
const PAUSE_MAIN_CLOCK = 'PAUSE_MAIN_CLOCK';
const INC_BREAK_CLOCK = 'INC_BREAK_CLOCK';
const DEC_BREAK_CLOCK = 'DEC_BREAK_CLOCK';
const INC_SESSION_CLOCK = 'INC_SESSION_CLOCK';
const DEC_SESSION_CLOCK = 'DEC_SESSION_CLOCK';

// import { INIT_GAMESET } from '../ducks/simon';
const INIT_GAMESET = 'INIT_GAMESET';
const MAKE_CHOICE = 'MAKE_CHOICE';
const INC_PLAY_COUNT = 'INC_PLAY_COUNT';
const DETERMINE_EQUALITY = 'DETERMINE_EQUALITY';
const DISPALAY_ERROR = 'DISPALAY_ERROR';
const PLAY_QUEUE_ANSWERS = 'PLAY_QUEUE_ANSWERS';
const RESET_GUESS_COUNT = 'RESET_GUESS_COUNT';
const RESET_GAMESET = 'RESET_GAMESET';
const RESET_ERRORS = 'RESET_ERRORS';
const RESET_PLAY_COUNT = 'RESET_PLAY_COUNT';
const RESET_IS_PLAYING = 'RESET_IS_PLAYING';
const ENABLE_CLICKS = 'ENABLE_CLICKS';
const DISABLE_CLICKS = 'DISABLE_CLICKS';
const TOGGLE_GAME_MODE = 'TOGGLE_GAME_MODE';
const TOGGLE_GAME_ON_OFF = 'TOGGLE_GAME_ON_OFF';

const START_COUNTDOWN = 'START_COUNTDOWN';
 
let d = new Date();

const clock = d.toLocaleTimeString();

const pomodoroInitialState = {
  clock: 25 * 60 * 1000
};

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
};

const quotesInitialState = {
  data: {},
  randomIdx: 0
};

const simonInitialState = {
  gameset: [],
  choiceset: [],
  playCount: 0,
  gameErrors: '',
  isPlaying: '',
  clickable: false,
  mode: 'easy',
  onOff: false
};

const weatherInitialState = {
  data: [],
  position: {},
  dataFetched: false,
  isFetching: false,
  error: false
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
  pomodoro: (state = pomodoroInitialState, { type, payload = 1 }) => {
    switch (type) {
      case START_MAIN_CLOCK:
      return {
        ...state,
        clock: state.clock - payload
      }
      case PAUSE_MAIN_CLOCK:
      return {
        ...state
      }
      case INC_BREAK_CLOCK:
      return {
        ...state
      }
      case DEC_BREAK_CLOCK:
      return {
        ...state
      }
      case INC_SESSION_CLOCK:
      return {
        ...state
      }
      case DEC_SESSION_CLOCK:
      return {
        ...state
      }
      default:
        return state
    }
  },
  quotes: (state = quotesInitialState, { type, payload }) => {
    switch (type) {
      case GET_QUOTE:
      return {
        ...state
      }
    case GET_QUOTE_PENDING:
      return {
        ...state,
        isFetching: true
      }
    case GET_QUOTE_FULFILLED:
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
        data: payload,
        randomIdx: Math.floor(Math.random() * payload.data.length)
      }
    case GET_QUOTE_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      }
      default:
        return state
    }
  },
  simon: (state = simonInitialState, { type, payload }) => {
    switch (type) {
      case INIT_GAMESET:
        return {
          ...state, 
            gameset: state.gameset.concat(payload),
        }
      case RESET_GAMESET:
        return {
          ...state, gameset: simonInitialState.gameset,
        }
      case MAKE_CHOICE:
        return {
          ...state,
          choiceset: state.choiceset.concat(payload.playerChoice),
          isPlaying: payload.playerChoice
        }
      case PLAY_QUEUE_ANSWERS:
        return {
          ...state,
          isPlaying: payload
        }
      case INC_PLAY_COUNT:
        return {
          ...state, 
            playCount: payload + 1
        }
      case RESET_GUESS_COUNT:
        return {
          ...state,
            choiceset: []
        }
      case DISPALAY_ERROR:
        return {
          ...state, 
            gameErrors: payload
        }
      case RESET_ERRORS:
        return {
          ...state, 
            gameErrors: simonInitialState.gameErrors
        }
      case RESET_PLAY_COUNT:
        return {
          ...state, 
            playCount: 0
        }
      case RESET_IS_PLAYING:
        return {
          ...state, 
            isPlaying: ''
        }
      case ENABLE_CLICKS:
        return {
          ...state, 
            clickable: true
        }
      case DISABLE_CLICKS:
        return {
          ...state, 
            clickable: payload
        }
      case TOGGLE_GAME_MODE:
        return {
          ...state, 
            mode: payload
        }
      case TOGGLE_GAME_ON_OFF:
        return {
          ...state, 
            onOff: payload
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
  weather: (state = weatherInitialState, { type, payload }) => {
    switch (type) {
      case GET_POSITION:
        return {
          ...state,
          isFetching: true
        }
      case GET_POSITION_FULFILLED:
        return {
          ...state,
          position: payload,
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
          data: payload
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
  },
  wiki: (state = wikiInitialState, { type, payload }) => {
    switch (type) {
      case GET_WIKI:
        return {
          ...state,
          isFetching: true
        }
      case GET_WIKI_PENDING:
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
