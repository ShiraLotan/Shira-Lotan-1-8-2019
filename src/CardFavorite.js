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


class CardFav extends Component {
state={
  city:'',
  
}

componentDidMount()
{debugger
  const allData = JSON.parse(localStorage.getItem('data'));
  console.log(allData)
}
 
  render() {
    return <div className='card'>

              <Card className='card'>
                <CardContent>
                  <Typography  color="textSecondary" gutterBottom>
                      {this.props.city.forcast.city}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Temp: {this.props.city.forcast.currentWeather[0].Temperature.Metric.Value}
                    <img className='celsius' src={celsius} alt='#'/>
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Weather: {this.props.city.forcast.currentWeather[0].WeatherText}

                  </Typography>
                </CardContent>
                {this.props.city.forcast.currentWeather[0].Temperature.Metric.Value>26 ? <img className='weatherImg' src={sunny} alt='#'/>: (this.props.city.forcast.currentWeather[0].Temperature.Metric.Value<=26 && this.props.city.forcast.currentWeather[0].Temperature.Metric.Value>14 ? <img className='weatherImg' src={mostlySunny} alt='#' />: (this.props.city.forcast.currentWeather[0].Temperature.Metric.Value<=14 ? <img className='weatherImg' src={cold} alt='#'/>: null ))}
                <CardActions>
                  <Button size="small">Remove</Button>
                </CardActions>
              </Card>

          </div>;
    }
}

// const mapStateToProps=(state)=>
// {
//   debugger
//   return {cityArr: state.allcities}
// }

// let favorite = connect(mapStateToProps,null)(Favorite)

export default CardFav;
