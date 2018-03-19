import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import geoMiddleware from "redux-effects-geolocation";
import { enableBatching } from "redux-batched-actions";
import promiseMiddleware from "redux-promise-middleware";
import soundsMiddleware from "redux-sounds";
import thunk from "redux-thunk";
import timerMiddleware from "redux-timer-middleware";
import reducers from "./reducers";
// import tvInitialState from '../ducks/tv';
// import wiki from '../ducks/wikisearch';

// TODO: import the initialState from the reducers(which imports from duck modules) as well. Keeping it here is weird

let reduxStore = null;

const tvInitialState = {
  esl_sc2: {},
  ogamingsc2: {},
  cretetion: {},
  freecodecamp: {},
  kyleshevlin: {},
  storbeck: {},
  habathcx: {},
  RobotCaleb: {},
  noobs2ninjas: {},
  dataFetched: false,
  isFetching: false,
  error: false
};

const initialState = {
  exampleString: "the default string",
  twitch: {},
  wiki: {},
  simon: {
    choiceset: [],
    gameset: [],
    playCount: 0,
    gameErrors: "",
    isPlaying: "",
    clickable: false,
    mode: "easy",
    onOff: false
  }
};

// a few sounds
const soundsData = {
  // If no additional configuration is necessary, we can just pass a string  as the path to our file.
  red: "../static/sounds/simonSound1.mp3",
  green: "../static/sounds/simonSound2.mp3",
  blue: "../static/sounds/simonSound3.mp3",
  yellow: "../static/sounds/simonSound4.mp3",
  error: "../static/sounds/error.mp3",
  win: "../static/sounds/win.mp3"

  // red: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
  // green: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
  // blue: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
  // yellow: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
};

const loadedSoundsMiddleware = soundsMiddleware(soundsData);

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = f => f;
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

function create(apollo, initialState = {}) {
  return createStore(
    enableBatching(
      combineReducers({
        // Setup reducers
        ...reducers,
        apollo: apollo.reducer()
      })
    ),
    initialState, // Hydrate the store with server-side data
    compose(
      applyMiddleware(
        apollo.middleware(),
        geoMiddleware(),
        loadedSoundsMiddleware,
        promiseMiddleware(),
        timerMiddleware,
        thunk
      ), // Add additional middleware here
      devtools
    )
  );
}

export default function initRedux(apollo, initialState) {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(apollo, initialState);
  }

  // Reuse store on the client-side
  if (!reduxStore) {
    reduxStore = create(apollo, initialState);
  }

  return reduxStore;
}
