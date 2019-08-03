const ADD_CITY = 'ADD_CITY';
const SEARCH = 'SEARCH';

const initialState = {
  allcities: [],
  searchName: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
      
    case ADD_CITY:{
      const weather = action.weather;
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

    default:
      return state;
  }
}
