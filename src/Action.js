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