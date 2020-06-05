import * as types from '../../actions/actionTypes';

const initialState = {
  cityWeather: {},
  mainCitiesWeather: []
};

export default function weatherReducer(state = initialState, action) {
  switch(action.type) {
    case types.LOAD_CITY_WEATHER_SUCCESS:
      return Object.assign({}, state, {cityWeather: action.cityWeather});
    case types.LOAD_MAIN_CITIES_WEATHER_SUCCESS:
      console.log('action1:', action.mainCitiesWeather)
      return Object.assign({}, state, {mainCitiesWeather: action.mainCitiesWeather});
    default:
      return state;
  }
}
