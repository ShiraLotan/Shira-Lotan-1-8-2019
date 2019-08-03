
export const addToFavorite = forcast => ({
  type: 'ADD_CITY',
  weather: {
    forcast
  }
})

export const searchCity = forcast => ({
    type: 'SEARCH',
    search: {
      forcast
    }
  })


export const deleteFromFavorite = todelete => ({
    type: 'DELETE_CITY',
    weather: {
        todelete
    }
  })