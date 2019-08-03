import React, { Component } from 'react';
import Day from './Day';
import './Daily.css';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import favorite from './img/favorite.png';
import { addToFavorite } from './Action';
import { connect } from "react-redux";

class Daily extends Component {
  state={
    city:'Tel Aviv',
    fiveDaysForcst:[]
  }

  async componentDidMount()
  {
    const city = await this.getCityCode()
    const apiKey='kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';
    // const telAviv = '215854';
    const respond = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.key}?apikey=${apiKey}`);
    const data = await respond.json()
    this.setState({
      fiveDaysForcst:data.DailyForecasts
    })

  }

  async getCityCode(){
    const apiKey='kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';
    let prepareCityName =this.state.city.split(" ")
    let finalCityForUrl = prepareCityName[0] + '%20' + prepareCityName[1]
    const city = finalCityForUrl;
    const respond = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`);
    const data =await respond.json();
    const cityObj = {
          name: data[0].LocalizedName,
          key: data[0].Key
        }
        return cityObj
    
  }
  classes =()=>{useStyles()} 

  render() {

    return <div className='daily'> 
                <Fab onClick={this.props.favorite(this.state)} color="primary" aria-label="add" className='fab'>
                    <img className='favorite' src={favorite} alt='#'/>
                </Fab>
          <h1 className='cityName'>{this.state.city}</h1>
          
          {this.state.fiveDaysForcst.map(function(day, i){
            return <Day key={i} weather={day} index={i} />})}
          </div>
  }
}

const useStyles = makeStyles(theme => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const mapDispatchToProps = function(dispatch){

    let obj = {
      
        favorite: function(data){
          dispatch(addToFavorite(data))
        }

      } 
      return obj

    }


let daily = connect(null,mapDispatchToProps)(Daily)

export default daily