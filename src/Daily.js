import React, { Component } from 'react';
import Day from './Day';
import './Daily.css';
import Fab from '@material-ui/core/Fab';
import { addToFavorite, setError } from './Action';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteFromFavorite, changeCelsius } from './Action'
import { searchCity } from './Action';
import Switch from '@material-ui/core/Switch';



class Daily extends Component {

  state = {
    city: this.props.data,
    fiveDaysForecast: [],
    key: '',
    celsiusToFar: false
  }

  handleChange = () => {
    this.setState({
      celsiusToFar: !this.state.celsiusToFar
    })
    this.props.changeCelsiusToFaAndBack(this.state.celsiusToFar)
  }

  errorHandled = (func) => {
    return async (...args) => {
      try {
        return await func(...args);
      }
      catch (error) {
        this.props.setError(error)
      }
    }
  }

  updateForecast = this.errorHandled(async (city) => {
    const apiKey = 'kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';
      const respond = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.key}?apikey=${apiKey}`);
      const data = await respond.json()
      this.setState({
        city: city.name,
        fiveDaysForecast: data.DailyForecasts,
        key: city.key
      })
  })

  updateForecastByCityName = this.errorHandled(async (cityName) => {
    const city = await this.getCityByName(cityName);
    return this.updateForecast(city);
  })

  updateForecastByGeoPosition = this.errorHandled(async (lat, lon) => {
    const city = await this.getCityByGeoPosition(lat, lon);
    return this.updateForecast(city);
  })

  componentDidMount() {
    if (this.props.data === '') {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.updateForecastByGeoPosition(lat, lon);
      });
    }
    else {


      this.updateForecastByCityName(this.props.data);
    }
  }

  componentDidUpdate(prevProps) {


    if (this.props.data !== prevProps.data) {
      this.updateForecastByCityName(this.props.data);
    }
  }

  getCityByGeoPosition = this.errorHandled(async (lat, lon) => {
    const apiKey = 'kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';
    const respond = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C${lon}`);
    const data = await respond.json();
    return {
      name: data.LocalizedName,
      key: data.Key
    };
  })

  getCityByName = this.errorHandled(async (city_name) => {
    const apiKey = 'kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';
    let q = encodeURIComponent(city_name)

    const respond = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${q}`);
    const data = await respond.json();


    if (data.length === 0) {

      alert('City was not found! Please try something else')
      this.props.searchCityName('Tel Aviv')
      const oblTelAviv = {
        name: 'tel aviv',
        key: 215854
      };
      return oblTelAviv
    } else {
      const cityObj = {
        name: data[0].LocalizedName,
        key: data[0].Key
      }
      return cityObj
    }
  })

  getCurrentWeather = this.errorHandled(async () => {
    const { history } = this.props;
    const apiKey = 'kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';
    const cityKey = this.state.key
    const respond = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`);
    const data = await respond.json();
    this.setState({
      currentWeather: data
    })
    await this.props.favorite(this.state)
    await history.push("/favorite")
  })

  removeFromFav = () => {
    this.props.deleteCity(this.state.key)
    alert(`You removed ${this.state.city} from your favorite`)

  }

  classes = () => useStyles();


  renderFab = () => {
    const isFavorite = this.props.allCities.some((city) => city.key === this.state.key);
    if (isFavorite) {
      return <Fab onClick={this.removeFromFav} aria-label="delete" className='deleteFav'>
        <DeleteIcon />
      </Fab>;
    }
    return <Fab onClick={this.getCurrentWeather.bind(this)} color="secondary" aria-label="edit" className={this.classes.fab}>
      <span className='plus'>+</span>
    </Fab>;
  }


  render() {
    return <div className='daily'>
      <div className='switcher'>
        <Switch
          checked={this.state.celsiusToFar}
          onChange={this.handleChange}
          value="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />{this.state.celsiusToFar ? <div className='headlineDegrees'>Celsius to Fahrenheit </div> : <div> Fahrenheit to Celsius  </div>}
      </div>
      <div className='fab'>
        {this.renderFab()}
      </div>
      {this.props.data === '' ? <h1 className='cityName'>{this.state.city}</h1> : <h1 className='cityName'>{this.props.data}</h1>}
      {this.state.fiveDaysForecast.map((day, i) => <Day key={i} weather={day} index={i} />)}

    </div>
  }
}


const mapDispatchToProps = function (dispatch) {
  let obj = {
    favorite: function (data) {
      dispatch(addToFavorite(data))
    },
    deleteCity: function (data) {
      dispatch(deleteFromFavorite(data))
    },
    searchCityName: function (data) {
      dispatch(searchCity(data))
    },
    changeCelsiusToFaAndBack: function (data) {
      dispatch(changeCelsius(data))
    },
    setError: error => dispatch(setError(error))
  }
  return obj
}

const mapStateToProps = (state) => {


  return {
    data: state.searchName.charAt(0).toUpperCase() + state.searchName.slice(1),
    allCities: state.allcities
  }
}


let daily = connect(mapStateToProps, mapDispatchToProps)(Daily)



const useStyles = makeStyles(theme => ({

  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default withRouter(daily)