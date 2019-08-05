import React, { Component } from 'react';
import Day from './Day';
import './Daily.css';
import Fab from '@material-ui/core/Fab';
import { addToFavorite } from './Action';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';



class Daily extends Component {

  state = {
    city: this.props.data,
    fiveDaysForecast: [],
    key: ''
  }

  async updateForecast(city) {
    const apiKey = 'kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';
    const respond = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.key}?apikey=${apiKey}`);
    const data = await respond.json()
    this.setState({
      city: city.name,
      fiveDaysForecast: data.DailyForecasts,
      key: city.key
    })
  }

  async updateForecastByCityName(cityName) {
    const city = await this.getCityByName(cityName);
    return this.updateForecast(city);
  }

  async updateForecastByGeoPosition(lat, lon) {
    const city = await this.getCityByGeoPosition(lat, lon);
    return this.updateForecast(city);
  }

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

  async getCityByGeoPosition(lat, lon) {
    const apiKey = 'kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';
    const respond = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C${lon}`);
    const data = await respond.json();
    debugger
    return {
      name: data.LocalizedName,
      key: data.Key
    };
  }

  async getCityByName(city_name) {
    const apiKey = 'kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';
    let q = encodeURIComponent(city_name)

    const respond = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${q}`);
    const data = await respond.json();
        debugger

        if(data.length===0)
          {
            alert('City was not found! Please try something else')
          }else{
            const cityObj = {
              name: data[0].LocalizedName,
              key: data[0].Key
            }
            return cityObj
          }
          
    return this.state


  }

  async getCurrentWeather() {
    
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
  }
  classes = () => useStyles();


  render() {
    console.log('fiveDaysForecast:', this.state.fiveDaysForecast);
    return <div className='daily'>
      <div className='fab'>
        <Fab onClick={this.getCurrentWeather.bind(this)} color="secondary" aria-label="edit" className={this.classes.fab}>
          <span className='plus'>+</span>
        </Fab>
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
    }
  }
  return obj
}

const mapStateToProps = (state) => {
  debugger

  return { data: state.searchName.charAt(0).toUpperCase() + state.searchName.slice(1) }
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