// first: import the constants
import { SET_STRING } from '../actions/exampleActions';


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
  }
}
