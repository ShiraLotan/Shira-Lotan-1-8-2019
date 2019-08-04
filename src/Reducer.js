const ADD_CITY = 'ADD_CITY';
const SEARCH = 'SEARCH';
const ADD_STORAGE = 'ADD_STORAGE';
const DELETE_CITY='DELETE_CITY';

const initialState = {
  allcities: [],
  searchName: '',

};
const add_id = 0;
const search_id = 0;


export default function(state = initialState, action) {
  switch (action.type) {
      
    case ADD_CITY:{
      const weather = action.weather.forcast;
      return {
        ...state,
        id: add_id+1,
        allcities: [...state.allcities, weather],
      };
    }
    case SEARCH:{
        const search = action.search.forcast;
        return {
            ...state,
          id: search_id+1,
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
      case DELETE_CITY:{
        debugger
        const keyToDelete = action.key;
        const newArr = state.allcities
        const newState = newArr.filter(cityKey=> cityKey.key!== keyToDelete)
        return {
            ...state,
            allcities: newState
        };
      }
    default:
      return state;
  }
}
