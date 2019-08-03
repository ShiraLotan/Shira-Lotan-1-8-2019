const ADD_CITY = 'ADD_CITY';
const initialState = {
  allcities: []
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
    // case TOGGLE_TODO: {
    //   const { id } = action.payload;
    //   return {
    //     ...state,
    //     byIds: {
    //       ...state.byIds,
    //       [id]: {
    //         ...state.byIds[id],
    //         completed: !state.byIds[id].completed
    //       }
    //     }
    //   };
    // }
    default:
      return state;
  }
}
