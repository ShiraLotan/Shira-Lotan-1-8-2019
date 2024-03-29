import * as Constants from './Constants'

export const addToFavorite = forcast => ({
  type: Constants.ADD_CITY,
  weather: {
    forcast
  }
})

export const loadState = state => ({
  type: Constants.LOAD_STATE,
  state,
})

export const searchCity = forcast => ({
    type: Constants.SEARCH,
    search: {
      forcast
    }
  })


export const deleteFromFavorite = todelete => ({
    type: Constants.DELETE_CITY,
    key: todelete
  })

  export const darkMode = bool => ({
    type: Constants.DARK_MODE,
    dark: bool
  })

  export const changeCelsius = bool => ({
    type: Constants.CHANGE_CEL,
    isSign: bool
  })

export const setError = error => ({ type: Constants.SET_ERROR, error });

export const changeTheme = () => ({ type: Constants.CHANGE_THEME });