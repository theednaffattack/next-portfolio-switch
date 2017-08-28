import axios from 'axios';
// CAN'T CURRENTLY SHORTCUT THIS, BE CAREFUL OF NAMES
// ------------------------------------
// Constants
// ------------------------------------
export const GET_QUOTE = 'GET_QUOTE'
export const GET_QUOTE_PENDING = 'GET_QUOTE_PENDING'
export const GET_QUOTE_FULFILLED = 'GET_QUOTE_FULFILLED'
export const GET_QUOTE_REJECTED = 'GET_QUOTE_REJECTED'

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

// const API_URL = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
const API_URL = 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=2';
const API_URL2 = 'https://random-quote-generator.herokuapp.com/api/quotes';

// from: https://gist.github.com/varmais/74586ec1854fe288d393
// const getPosition = function (options) {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject, options);
//   });
// }

// export function getQuote (dispatch) {
//   return (dispatch) => {
//     // call a function to get the quote
//     // dispatch within that function
//   } // end outer return
// }

// export function geoPositioning (dispatch) {
//   return (dispatch) => {
//     dispatch({ type: 'GET_POSITION' })
//     getPosition()
//       .then((position) => {
//         console.log('Position!!!')
//         console.log(JSON.stringify(position.coords, null, 2));
//         dispatch({ type: 'GET_POSITION_FULFILLED', payload: {position} })
//         dispatch(axiosGetQuotes())
//       })
//       .catch((error) => {
//         console.error(error.message);
//         dispatch({ type: 'GET_POSITION_REJECTED', payload: error })
//       });
//   }
// }
// from: https://gist.github.com/varmais/74586ec1854fe288d393
// 

export const requestQuote = () => ({
  type: 'GET_QUOTE',
  payload: axios({
    method: 'get',
    url: API_URL2,
    // headers: {'X-Mashape-Key': 'RxgO9z4RlfmshBZcAA8CDQ5lBn2gp1j5lJfjsn3iwh7sgp85W1'}
  })
})

const randomQuoteIdx = function() {
  return Math.floor(Math.random() * 5);
};

export function axiosGetQuotes () {
  return (dispatch) => {
    axios.get(API_URL2)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        dispatch({ type: 'GET_QUOTE_REJECTED', payload: error })
      });
  };
}

export const actions = {
  axiosGetQuotes
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_QUOTE]    : (state, action) => state + action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
// const initialState = {}
// export default function quotesReducer (state = initialState, action) {
//   const handler = ACTION_HANDLERS[action.type]

//   return handler ? handler(state, action) : state
// }

// From: https://medium.com/react-native-training/redux-4-ways-95a130da0cdc

const initialState = {
  data: {},
  quotes: '',
}

export default function quotesReducer (state = initialState, action) {
  switch (action.type) {
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
        data: action.payload
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
}
