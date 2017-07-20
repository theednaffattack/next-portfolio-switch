import { combineReducers } from 'redux';
import demoString from './demoReducer';
import kittens from './kittensReducer';
import weather from '.routeModules/Weather/modules/weather';
import wiki from '../ducks/wikisearch'

export default combineReducers({
  demoString,
  wiki,
  kittens,
  weather,
});