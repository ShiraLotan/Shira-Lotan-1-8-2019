import * as Constants from './Constants'

const initialState = {
  allcities: [],
  searchName: '',
  add_id: 0,
  theme: 'light'
};


export default function (state = initialState, action) {
  switch (action.type) {

    case Constants.ADD_CITY: {
      const weather = action.weather.forcast;
      const nextAddId = state.add_id + 1;
      return {
        ...state,
        add_id: nextAddId,
        allcities: [
          ...state.allcities,
          {
            ...weather,
            nextAddId
          }
        ],
      };
    }
    case Constants.SEARCH: {
      const search = action.search.forcast;
      return {
        ...state,
        searchName: search,
      };
    }

    case Constants.LOAD_STATE: {
      return action.state;
    }

    case Constants.DELETE_CITY: {
      const keyToDelete = action.key;
      const newArr = state.allcities
      const newState = newArr.filter(cityKey => cityKey.key !== keyToDelete)
      return {
        ...state,
        allcities: newState
      };
    }
    case Constants.CHANGE_CEL: {
      const isSign = action.isSign;
      return {
        ...state,
        isSign: isSign
      };
    }
    case Constants.SET_ERROR: {
      return {
        ...state,
        error: action.error
      }
    }
    case Constants.CHANGE_THEME: {
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      }
    }
    default:
      return state;
  }
}
