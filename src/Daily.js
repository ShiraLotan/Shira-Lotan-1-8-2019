import React, { Component } from 'react';
import Day from './Day';
import './Daily.css';
import Fab from '@material-ui/core/Fab';
import { addToFavorite } from './Action';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteFromFavorite } from './Action'
import { searchCity } from './Action';


class Daily extends Component {

  state = {
    city: this.props.data,
    fiveDaysForecast: [],
    key: ''
  }

  async updateForecast(city) {
    try{
      const apiKey = 'kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';
      const respond = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.key}?apikey=${apiKey}`);
      const data = await respond.json()
      this.setState({
        city: city.name,
        fiveDaysForecast: data.DailyForecasts,
        key: city.key
      })
    }catch{
      alert('something went wrong')

    }
    
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
    try{
      const apiKey = 'kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';
      const respond = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C${lon}`);
      const data = await respond.json();
      return {
        name: data.LocalizedName,
        key: data.Key
      };
    }catch{
        alert('something went wrong')
    }
    
  }

  async getCityByName(city_name) {
    try{
      const apiKey = 'kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';
      let q = encodeURIComponent(city_name)

      const respond = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${q}`);
      const data = await respond.json();
        

        if(data.length===0)
          {
            
            alert('City was not found! Please try something else')
            this.props.searchCityName('Tel Aviv')
            const oblTelAviv ={ 
                name: 'tel aviv',
                key: 215854
              };
            return oblTelAviv
          }else{
            const cityObj = {
              name: data[0].LocalizedName,
              key: data[0].Key
            }
            return cityObj
          }
          
    }catch{
      alert('something went wrong')

    }
    


  }

  async getCurrentWeather() {
    try{
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
    }catch{
      alert('something went wrong')
    }
   
  }

  removeFromFav=()=>
  {
    this.props.deleteCity(this.state.key)
    alert(`You removed ${this.state.city} from your favorite`)

  }

  classes = () => useStyles();


  render() {
    return <div className='daily'>
        
      <div className='fab'>
        
        {this.props.allCities.length>0 ? this.props.allCities.map((city, i)=> city.key !== this.state.key ? null:  <Fab key ={i} onClick={this.removeFromFav}  aria-label="delete" className='deleteFav'>
                                                                                                                <DeleteIcon />
                                                                                                              </Fab> ) :<Fab  onClick={this.getCurrentWeather.bind(this)} color="secondary" aria-label="edit" className={this.classes.fab}>
                                                                                                                          <span className='plus'>+</span>
                                                                                                                        </Fab>}
        
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
    deleteCity: function(data){
      dispatch(deleteFromFavorite(data))
    },
    searchCityName: function(data){
      dispatch(searchCity(data))
    }
    
  }
  return obj
}

const mapStateToProps = (state) => {
  

  return { data: state.searchName.charAt(0).toUpperCase() + state.searchName.slice(1),
            allCities: state.allcities }
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