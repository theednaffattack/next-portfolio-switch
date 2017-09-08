import { START_TIMER, STOP_TIMER } from 'redux-timer-middleware';

// ------------------------------------
// Constants
// ------------------------------------
export const RESET_TIMER = 'RESET_TIMER';
export const DEC_SESSION_CLOCK = 'DEC_SESSION_CLOCK';
export const INC_SESSION_CLOCK = 'INC_SESSION_CLOCK';
export const INC_BREAK_CLOCK = 'INC_BREAK_CLOCK';
export const DEC_BREAK_CLOCK = 'DEC_BREAK_CLOCK';
export const LOAD_MAIN_TIMER = 'LOAD_MAIN_TIMER';
export const START_MAIN_TIMER_END = 'START_MAIN_TIMER_END';
// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export function incSessionClock(dispatch) {
  console.log(dispatch);
  const derPayload = dispatch;
  return (dispatch) => {
    dispatch({ type: INC_SESSION_CLOCK, payload: derPayload });
  };
};
export const decSessionClock = function(dispatch) {
  console.log(dispatch);
  const derPayload = dispatch;
  return (dispatch) => {
    dispatch({ type: DEC_SESSION_CLOCK, payload: derPayload });
  };
};
export const incBreakClock = function(dispatch) {
  console.log(dispatch);
  const derPayload = dispatch;
  return (dispatch) => {
    dispatch({ type: INC_BREAK_CLOCK, payload: derPayload });
  };
};

export const decBreakClock = function(dispatch) {
  console.log(dispatch);
  const derPayload = dispatch;
  return (dispatch) => {
    dispatch({ type: DEC_BREAK_CLOCK, payload: derPayload });
  };
};

export const resetMainClock = function() {
  return (dispatch) => {
    dispatch({
      type: RESET_TIMER,
      payload: 60,
    });
  };
};

export function loadBreakClock(dispatch, mainClockVal, newClockVal) {
  const payloadObj = {
    mainClockVal,
    newClockVal,
    timerIsRunning: true,
  };
  console.log('func loadBreakClock: payloadObj = ' + JSON.stringify(payloadObj, null, 2));
  return (dispatch) => {
    dispatch({
      type: LOAD_MAIN_TIMER,
      payload: payloadObj,
    });
  };
};



export function loadSessionClock(dispatch, mainClockVal, newClockVal) {
  if (mainClockVal <= 0) {
    const payloadObj = {
      mainClockVal: newClockVal,
      newClockVal,
      timerIsRunning: true,
    };
    console.log('payloadObj within if: ' + JSON.stringify(payloadObj, null, 2));

    return (dispatch) => {
      dispatch({
        type: LOAD_MAIN_TIMER,
        payload: payloadObj,
      });
      // dispatch({
      //   type: RESET_TIMER,
      //   payload: sessionClockVal,
      // });
      dispatch({
        type: START_TIMER,
        payload: {
          actionName: 'START_MAIN_TIMER',
          timerName: 'mainTimer',
          timerInterval: 1000,
          timerPeriod: payloadObj.newClockVal,
        },
      });
    }; // end return
  }
    const payloadObj = {
      mainClockVal,
      newClockVal,
      timerIsRunning: true,
    };

    const timerPeriod = payloadObj.newClockVal;

    console.log('payloadObj outside if: ' + JSON.stringify(payloadObj, null, 2));
    console.log('timerPeriod value: ' + timerPeriod);

    return (dispatch) => {
      dispatch({
        type: LOAD_MAIN_TIMER,
        payload: payloadObj,
      });
      // dispatch({
      //   type: RESET_TIMER,
      //   payload: sessionClockVal,
      // });
      dispatch({
        type: START_TIMER,
        payload: {
          actionName: 'START_MAIN_TIMER',
          timerName: 'mainTimer',
          timerInterval: 1000,
          timerPeriod,
        },
      });
    }; // end return
}

export function startMainClock(dispatch, mainClockVal, newClockVal) {
  // const d = new Date();
  // var distance = 60000;
  // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  // var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  // var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  // const defaultTimer = 1 * 60 // 1 minute(s)
  console.log(mainClockVal);

  if (mainClockVal <= 0) {
    console.log('from within if statement: newClockVal = ' + newClockVal);
    return (dispatch) => {
      dispatch({
        type: RESET_TIMER,
        payload: newClockVal,
      });
      dispatch({
          type: START_TIMER,
          payload: {
              actionName: 'START_MAIN_TIMER',
              timerName: 'mainTimer',
              timerInterval: 1000,
              timerPeriod: newClockVal,
          }
      });
    };
  }
  console.log('from after if statement: mainClockVal = ' + mainClockVal);

  return (dispatch) => {
    dispatch({
        type: START_TIMER,
        payload: {
            actionName: 'START_MAIN_TIMER',
            timerName: 'mainTimer',
            timerInterval: 1000,
            timerPeriod: mainClockVal,
        }
    });
  };
};

export const pauseMainClock = function(dispatch) {
  return (dispatch) => {
    dispatch({
      type: STOP_TIMER,
      payload: {
        timerName: 'mainTimer',
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

