import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'tv',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Tv = require('./containers/TvContainer').default
      const reducer = require('./modules/tv').default

      /*  Add the reducer to the store on key 'tv'  */
      injectReducer(store, { key: 'tv', reducer })

      /*  Return getComponent   */
      cb(null, Tv)

    /* Webpack named bundle   */
    }, 'tv')
  }
})
