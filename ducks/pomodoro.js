import {START_TIMER} from 'redux-timer-middleware';
import {STOP_TIMER} from 'redux-timer-middleware';
// CAN'T CURRENTLY SHORTCUT THIS, BE CAREFUL OF NAMES
// ------------------------------------
// Constants
// ------------------------------------
// export const GET_QUOTE = 'GET_QUOTE';

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export function incSessionClock(dispatch) {
  return (dispatch) => {};
};
export const decSessionClock = function(arg) {};
export const incBreakClock = function(arg) {};
export const decBreakClock = function(arg) {};

export function startMainClock(dispatch) {
  // const d = new Date();
  // var distance = 60000;
  // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  // var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  // var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  const defaultTimer = 1 * 60 // 1 minute(s)
  
  return (dispatch) => {
    dispatch({
        type: START_TIMER,
        payload: {
            actionName: 'START_MAIN_CLOCK',
            timerName: 'mainTimer',
            timerInterval: 1000,
            timerPeriod: defaultTimer
        }
    });
  };
};

export const pauseMainClock = function(dispatch) {
  return (dispatch) => {
    dispatch({
      type: STOP_TIMER,
      payload: {
        timerName: 'mainTimer'
      }
    });
  };
};


// ------------------------------------
// Action Handlers
// ------------------------------------
// const ACTION_HANDLERS = {
//   [GET_QUOTE]    : (state, action) => state + action.payload
// }

// ------------------------------------
// Reducer
// ------------------------------------
// const initialState = {}
// export default function quotesReducer (state = initialState, action) {
//   const handler = ACTION_HANDLERS[action.type]

//   return handler ? handler(state, action) : state
// }

// From: https://medium.com/react-native-training/redux-4-ways-95a130da0cdc

