import { combineReducers } from 'redux';
import demoString from './demoReducer';
import kittens from './kittensReducer';
import weather from '.routeModules/Weather/modules/weather';

export default combineReducers({
  demoString,
  kittens,
  weather
});