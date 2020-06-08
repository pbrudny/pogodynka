import * as types from '../../actions/actionTypes';

const initialState = {
  cityWeather: {},
  mainCitiesWeather: [],
};

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_CITY_WEATHER_SUCCESS:
      return { ...state, cityWeather: action.cityWeather };
    case types.LOAD_MAIN_CITIES_WEATHER_SUCCESS:
      return { ...state, mainCitiesWeather: action.mainCitiesWeather };
    default:
      return state;
  }
}
