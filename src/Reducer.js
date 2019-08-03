const ADD_CITY = 'ADD_CITY';
const SEARCH = 'SEARCH';
const ADD_STORAGE = 'ADD_STORAGE';

const initialState = {
  allcities: [],
  searchName: '',

};

export default function(state = initialState, action) {
  switch (action.type) {
      
    case ADD_CITY:{
      debugger
      const weather = action.weather.forcast;
      return {
        ...state,
        allcities: [...state.allcities, weather],
      };
    }
    case SEARCH:{
        const search = action.search.forcast;
        return {
            ...state,
          searchName: search,
        };
      }

      case ADD_STORAGE:{
        const weather = action.weather;
        return {
            ...state,
            allcities: [...state.allcities,weather]
        };
      }

    default:
      return state;
  }
}
