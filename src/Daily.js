import React, { Component } from 'react';
import Day from './Day';
import './Daily.css';
import Fab from '@material-ui/core/Fab';
import { addToFavorite } from './Action';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';



class Daily extends Component {

  state={
    city:this.props.data,
    fiveDaysForcst:[],
    key:''
  }

  async componentDidMount()
  {
  
    if(this.props.data===''){
      const city = await this.getCityCode('tel aviv')
      const apiKey='kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';

      const respond = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.key}?apikey=${apiKey}`);
      const data = await respond.json()
      this.setState({
        city: 'Tel Aviv',
        fiveDaysForcst:data.DailyForecasts,
        key: city.key
      })
    }else{
      this.setState({
        city: this.props.data
      })
      const city = await this.getCityCode(this.props.data)
      const apiKey='kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';

      const respond = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.key}?apikey=${apiKey}`);
      const data = await respond.json()
      this.setState({
        fiveDaysForcst:data.DailyForecasts,
        key: city.key
      })
    }
    
  }

  async getCityCode(city_name){
    const apiKey='kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';
    let prepareCityName =city_name.split(" ")
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

  async getCurrentWeather()
{
  const { history } = this.props;
  const apiKey='kGOBBGqaGGlvbSUYueThADFlJ1eMSyCr';
  const cityKey = this.state.key
  const respond =await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`);
  const data = await respond.json();
    this.setState({
      currentWeather: data
    })
     await localStorage.setItem('data', JSON.stringify(this.state))
     await this.props.favorite(this.state)
     await history.push("/favorite")
}
classes =()=> useStyles();


  render() {

    return <div className='daily'> 
    <div className='fab'>
      <Fab onClick={this.getCurrentWeather.bind(this)} color="secondary" aria-label="edit" className={this.classes.fab}>
          <span className='plus'>+</span>
      </Fab>
    </div>           
          <h1 className='cityName'>{this.state.city}</h1>
          <h1>{this.props.data}</h1>
          {this.state.fiveDaysForcst.map(function(day, i){
            return <Day key={i} weather={day} index={i} />})}
          </div>
  }
}




const mapDispatchToProps = function(dispatch){
    let obj = {
        favorite: function(data){
          dispatch(addToFavorite(data))
        }
      } 
      return obj
    }
    
const mapStateToProps=(state)=>
    {
      return {data: state.searchName}
    }
let daily = connect(mapStateToProps ,mapDispatchToProps)(Daily)



const useStyles = makeStyles(theme => ({
  
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default withRouter(daily)