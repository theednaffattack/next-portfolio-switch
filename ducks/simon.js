import { batchActions } from 'redux-batched-actions';
// CAN'T CURRENTLY SHORTCUT THIS, BE CAREFUL OF NAMES
// ------------------------------------
// Constants
// ------------------------------------
export const PLAY_QUEUE_ANSWERS = 'PLAY_QUEUE_ANSWERS'
export const TOGGLE_POWER = 'TOGGLE_POWER'
export const RESET_GAME = 'RESET_GAME'
export const START_GAME = 'START_GAME'
export const INIT_GAMESET = 'INIT_GAMESET'
export const MAKE_CHOICE = 'MAKE_CHOICE'
export const INC_PLAY_COUNT = 'INC_PLAY_COUNT'
export const DETERMINE_EQUALITY = 'DETERMINE_EQUALITY'
export const DISPALAY_ERROR = 'DISPALAY_ERROR'
export const RESET_GUESS_COUNT = 'RESET_GUESS_COUNT'
export const RESET_GAMESET = 'RESET_GAMESET'
export const RESET_ERRORS = 'RESET_ERRORS'
export const RESET_PLAY_COUNT = 'RESET_PLAY_COUNT'
export const RESET_IS_PLAYING = 'RESET_IS_PLAYING'
export const ENABLE_CLICKS = 'ENABLE_CLICKS'
export const DISABLE_CLICKS = 'DISABLE_CLICKS'
export const TOGGLE_GAME_MODE = 'TOGGLE_GAME_MODE'
export const TOGGLE_GAME_ON_OFF = 'TOGGLE_GAME_ON_OFF'

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

// ----------------------
// Batch Actions
// ----------------------



function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const colors = ['blue', 'red', 'yellow', 'green']
  const someMath = Math.floor(Math.random() * (max - min + 1)) + min;
  const choice = colors[someMath]
  return choice;
}

function getSeries() {
  var series = [] 
    for(var i = 0; i < 20; i++) {
      series[i] = getRandomIntInclusive(0,3);
    }
  return series
};

function enableClicks() {
  // do func stuff
  return (dispatch) => { dispatch({ type: ENABLE_CLICKS, payload: true })}
}

function disableClicks() {
  return (dispatch) => { dispatch({ type: DISABLE_CLICKS, payload: false })}
}

export function toggleGameMode(dispatch, newMode) {
  return (dispatch) => { dispatch({ type: TOGGLE_GAME_MODE, payload: newMode})}
}

export function toggleGameOnOff(dispatch, powerState, clickableState) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_GAME_ON_OFF, payload: powerState})
    dispatch({ type: DISABLE_CLICKS, payload: clickableState })
  }
}

function incPlayCount(count) {
  return (dispatch) => { dispatch({ type: INC_PLAY_COUNT, payload: count++ }) }
}

function makeNextAction(mode, playerPress, nextPress) {
  // this will determine if the compuer should give the player another turn
}

function determineEquality(dispatch, gameCount, computerChoices, guessCount) {
  const info = dispatch
  const guessKey = !guessCount ? 0 : guessCount;
  if (info === computerChoices[guessKey]) {
    return {
      playerChoice: info,
      gameCount,
      computerChoices,
      guessCount
    }
  } // end if statement
  return false
}

function playSound(dispatch, gameCount, computerChoices) {
  const arr = computerChoices;
  for (let i=0; i < gameCount; i++) {
    let count = 0;
    const x=setTimeout(function() {
      dispatch({ type: PLAY_QUEUE_ANSWERS, payload: 'sound', meta: { sound: arr[i] } })
      console.log('gameCount: ' + gameCount + ' string: ' + arr[i])
      if (count = gameCount) {clearTimeout(x)}
      count++
    }, 3000);
  }
}

function soundPlayer(dispatch, gameCount, computerChoices) {
  computerChoices.forEach(function(currentValue, index, array) {
    setTimeout(dispatch({ type: PLAY_QUEUE_ANSWERS, payload: currentValue, meta: { sound: currentValue } }), 3000, dispatch, gameCount, computerChoices);
  })
}

function delayLoop(dispatch, soundArr, limit, interval, at ) {
  var at = at || 1;
  let colorValue = soundArr[at-1]
  if (at <= limit) {
      setTimeout(function() {
          console.log(colorValue, at);
          dispatch({ type: DISABLE_CLICKS, payload: false })
          dispatch({ type: PLAY_QUEUE_ANSWERS, payload: colorValue, meta: { sound: colorValue } })
          dispatch({ type: RESET_GUESS_COUNT, payload: '' }); // reset the player guess array

          setTimeout(() => {
            dispatch({ type: RESET_IS_PLAYING, payload: '' })
          }, 500)
          delayLoop(dispatch, soundArr, limit, interval, at + 1);
      }, interval);
  } else {
    dispatch({ type: ENABLE_CLICKS, payload: true })
  }
  
}

export const initGameset = (dispatch) => {
  const playSeries = getSeries()
  return (dispatch) => {
    dispatch({ type: RESET_GAMESET })
    dispatch({ type: DISABLE_CLICKS, payload: false })
    dispatch({ type: INIT_GAMESET, payload: playSeries })
    dispatch({ type: PLAY_QUEUE_ANSWERS, payload: playSeries[0], meta: { sound: playSeries[0] } })
    dispatch({ type: RESET_GUESS_COUNT, payload: '' }); // reset the guess count, ready for input

    setTimeout(() => {
      dispatch({ type: RESET_IS_PLAYING, payload: '' })
    }, 500)
    dispatch({ type: ENABLE_CLICKS, payload: true })
  }
}

export const resetGameset = (dispatch) => {
  const playSeries = getSeries()
  return (dispatch) => {
    dispatch({ type: RESET_IS_PLAYING, payload: '' }); // reset the guess count, ready for input
    dispatch({ type: RESET_GAMESET })
    dispatch({ type: RESET_GUESS_COUNT })
    dispatch({ type: RESET_ERRORS })
    dispatch({ type: RESET_PLAY_COUNT })
    dispatch({ type: DISABLE_CLICKS, payload: false })
    dispatch({ type: INIT_GAMESET, payload: playSeries })
    dispatch({ type: PLAY_QUEUE_ANSWERS, payload: playSeries[0], meta: { sound: playSeries[0] } })
    // dispatch({ type: RESET_GUESS_COUNT, payload: '' }); // reset the guess count, ready for input

    setTimeout(() => {
      dispatch({ type: RESET_IS_PLAYING, payload: '' })
      dispatch({ type: ENABLE_CLICKS, payload: true })
    }, 500)
  }
}

export function makeChoice(dispatch, gameCount, computerChoice, computerChoices, guessCount, mode) {
  const gameError = 'Bzzzt! You guessed wrong playa!'
  const soundColor = dispatch;
  const interval = 600;
  const info = determineEquality(dispatch, gameCount, computerChoices, guessCount)
  if (info){ // player guesses matched against computer play, executed synchronous dispatches below
    if (guessCount == gameCount) { // if this is the end of guesses (if length of guesses arr is the same as playCount prop )
          return (dispatch, getState) => {
            dispatch({ type: MAKE_CHOICE, payload: info, meta: { sound: soundColor } }); // play the user's choice

            dispatch({ type: INC_PLAY_COUNT, payload: gameCount++ });
            dispatch({ type: RESET_GUESS_COUNT }); // reset the player guess array

            setTimeout(() => {
              dispatch({ type: RESET_IS_PLAYING, payload: '' })
            }, 300)

            dispatch({ type: DISABLE_CLICKS, payload: false })
            setTimeout(() => {
              delayLoop(dispatch, computerChoices, gameCount+1, interval); // replay the previous game plays
            }, 700)
          }
    } // end inner if statement
    return (dispatch, getState) => { // if you need to make another guess in the series
      console.log('More guesses, gameCount ' + gameCount + ' guessCount ' + guessCount + '\ninfo = ' + JSON.stringify(info, null, 2))
      dispatch({ type: ENABLE_CLICKS, payload: true })
      dispatch({ type: MAKE_CHOICE, payload: info, meta: { sound: soundColor } });
      setTimeout(() => {
        dispatch({ type: RESET_IS_PLAYING, payload: '' })
      }, 500)
    }
  } else {
    if (mode == 'easy') {
      return (dispatch, getState) => {
        dispatch({ type: DISPALAY_ERROR, payload: gameError, meta: { sound: 'error' } }); 
        dispatch({ type: RESET_GUESS_COUNT }); // reset the guess count, ready for input
        // if (!mode == 'strict') {
        //   // dispatch delayLoop
        // }
        // return
        setTimeout(() => {
          delayLoop(dispatch, computerChoices, gameCount +1, interval); // replay the previous game plays
        }, 700)
      }
    } else {
      const playSeries = getSeries()
      return (dispatch, getState) => {
        dispatch({ type: DISPALAY_ERROR, payload: gameError, meta: { sound: 'error' } }); 


        dispatch({ type: RESET_IS_PLAYING, payload: '' }); // reset the guess count, ready for input
        dispatch({ type: RESET_GAMESET })

        setTimeout(() => {
          dispatch({ type: RESET_GUESS_COUNT }); // reset the guess count, ready for input
        }, 700)
        // reset action
        dispatch({ type: RESET_ERRORS })
        dispatch({ type: RESET_PLAY_COUNT })
        dispatch({ type: DISABLE_CLICKS, payload: false })
        dispatch({ type: INIT_GAMESET, payload: playSeries })
        dispatch({ type: PLAY_QUEUE_ANSWERS, payload: playSeries[0], meta: { sound: playSeries[0] } })
        // dispatch({ type: RESET_GUESS_COUNT, payload: '' }); // reset the guess count, ready for input

        setTimeout(() => {
          dispatch({ type: RESET_IS_PLAYING, payload: '' })
          dispatch({ type: ENABLE_CLICKS, payload: true })
        }, 500)
    }
  }
}
}

export const playQueueAnswer = (dispatch) => {
  dispatch ({ type: PLAY_QUEUE_ANSWER, payload: '', sound: dispatch })
}