// constants
export const SPLASH_MOUNT = 'SET_STRING';

/**
 * sets the string, if none is passed, it will default to the below string.
 * @param theString
 * @return {{type: string, theString: String}}
 */
export function splashMount(theString: String = 'the default string') {
  return {
    type: SPLASH_MOUNT,
    payload: theString
  }
}
