import { mainCities } from '../../data/mainCities';
import * as types from '../../actions/actionTypes';

const initialState = {
  cityWeather: {},
  otherCities: []
};

export default function weatherReducer(state = initialState, action) {
  switch(action.type) {
    case types.LOAD_CITY_WEATHER_SUCCESS:
      return Object.assign({}, state, action.cityWeather);
    default:
      return state;
  }
}
