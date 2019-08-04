import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './CardFavorite.css';
import sunny from './img/sunny.png';
import mostlySunny from './img/mostlySunny.png';
import celsius from './img/celsius.png';
import cold from './img/cold.png';
import { connect } from "react-redux";
import { deleteFromFavorite } from './Action'
import { withRouter } from 'react-router-dom';

class CardFav extends Component {

  removeFav=()=>{
    console.log(this.props.city.key) 
    this.props.deleteCity(this.props.city.key)
  }
  mainPage=()=>
  {
   this.props.history.push("/")
  }

  render() {
    const num = Number(this.props.city.currentWeather[0].Temperature.Metric.Value)
    
    return <div className='allcards'>

              <Card onClick={this.mainPage} className='card'>
                <CardContent>
                  <Typography  color="textSecondary" gutterBottom>
                      {this.props.city.city}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Temp: {this.props.city.currentWeather[0].Temperature.Metric.Value}
                    <img className='celsius' src={celsius} alt='#'/>
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Weather: {this.props.city.currentWeather[0].WeatherText}

                  </Typography>
                </CardContent>
                {num>26 ? <img className='weatherImg' src={sunny} alt='#'/>: (num<=26 && num>14 ? <img className='weatherImg' src={mostlySunny} alt='#' />: (num<=14 ? <img className='weatherImg' src={cold} alt='#'/>: null ))}
                <CardActions>
                  <Button onClick={this.removeFav} size="small">Remove</Button>
                </CardActions>
              </Card>

          </div>;
    }
}
const mapDispatchToProps = function(dispatch){
  let obj = {
      deleteCity: function(data){
        dispatch(deleteFromFavorite(data))
      }
    } 
    return obj
  }

let cardFav = connect(null ,mapDispatchToProps)(CardFav)

export default withRouter(cardFav);
