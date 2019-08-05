import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './Day.css';
import celsius from './img/celsius.png';
import mostlySunny from './img/mostlySunny.png';
import sunny from './img/sunny.png';
import clear from './img/clear.png';
import mostlyClear from './img/mostlyClear.png';
import partlyCloudy from './img/partlyCloudy.jpeg';
import partlySunny from './img/partlySunny.png';
import cloudy from './img/cloudy.jpeg';
import storm from './img/storm.png';
import thunderStorm from './img/thunderStorm.png';
import rainy from './img/rainy.png';
import dry from './img/dry.png';

const useStyles = makeStyles({
  card: {
    minWidth: 230,
    height: 325
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
    color: 'black'
  },
  pos: {
    marginBottom: 12,
  },
});

const detectDay=(num)=>{
  let dayName='';
  if(num === 0){
    dayName='Sunday'
  }else if(num===1)
  {
    dayName='Monday'
  }else if(num===2)
  {
    dayName='Tuesday'
  }else if(num===3)
  {
    dayName='Wednesday'
  }else if(num===4)
  {
    dayName='Thursday'
  }

  return dayName
}

const changeFahrenheitToCelsius=(fah)=>
{
  const celsius =(Number(fah)-32)*(5/9)
  return Math.floor(celsius)
}

function Day(props) {
  

  const classes = useStyles();
  return (
    <div className="Day">

    

      <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {detectDay(props.index)}
        </Typography>
        
        { props.weather.Day.IconPhrase === 'Sunny' ? <img className='sun' src={sunny} alt='#'/>: (props.weather.Day.IconPhrase === 'Mostly sunny' ? <img className='sun' src={mostlySunny} alt='#'/>: (props.weather.Day.IconPhrase === 'Partly sunny' || props.weather.Day.IconPhrase==='Partly sunny w/ showers' || props.weather.Day.IconPhrase==='Partly sunny w/ t-storms' ? <img className='sun' src={partlySunny} alt='#'/>: (props.weather.Day.IconPhrase === 'Mostly cloudy w/ t-storms' ? <img className='sun' src={storm} alt='#'/>: (props.weather.Day.IconPhrase === 'Mostly cloudy' || props.weather.Day.IconPhrase ==='Intermittent clouds' ? <img className='sun' src={cloudy} alt='#'/>: (props.weather.Day.IconPhrase === 'Thunderstorms' ? <img className='sun' src={thunderStorm} alt='#'/>: ( props.weather.Day.IconPhrase === 'Showers' || props.weather.Day.IconPhrase==='Mostly cloudy w/ showers' || props.weather.Day.IconPhrase === 'Rain' ? <img className='sun' src={rainy} alt='#'/>: (props.weather.Day.IconPhrase === 'Thunderstorms' ? <img className='sun' src={thunderStorm} alt='#'/>: (props.weather.Day.IconPhrase ==='RainDreary' ? <img className='sun' src={dry} alt='#'/> : null))))))))}
        <Typography className={classes.pos} color="textSecondary">
         Day: {props.weather.Day.IconPhrase}
        </Typography>
        { props.weather.Night.IconPhrase === 'Clear' ? <img className='sun' src={clear} alt='#'/>: (props.weather.Night.IconPhrase === 'Mostly clear' ? <img className='sun' src={mostlyClear} alt='#'/>:(props.weather.Night.IconPhrase === 'Partly cloudy' ? <img className='sun' src={partlyCloudy} alt='#'/>: (props.weather.Night.IconPhrase === 'Mostly cloudy' || props.weather.Night.IconPhrase ==='Cloudy'? <img className='sun' src={cloudy} alt='#'/>: (props.weather.Night.IconPhrase === 'Intermittent clouds' || props.weather.Night.IconPhrase === 'Mostly cloudy w/ showers'  ? <img className='sun' src={partlyCloudy} alt='#'/>: (props.weather.Night.IconPhrase === 'Thunderstorms' ? <img className='sun' src={thunderStorm} alt='#'/>: (props.weather.Day.IconPhrase === 'Mostly cloudy w/ t-storms' || props.weather.Night.IconPhrase==='Partly cloudy w/ t-storms'? <img className='sun' src={storm} alt='#'/>:(props.weather.Night.IconPhrase==='Showers' ? <img className='sun' src={rainy} alt='#'/>:(props.weather.Night.IconPhrase ==='Dreary' ? <img className='sun' src={dry} alt='#'/> : null))))))))}

        <Typography className={classes.pos} color="textSecondary">
          Night: {props.weather.Night.IconPhrase} 
        </Typography>
        
        <Typography variant="body2" component="p">
          Min Temp:{changeFahrenheitToCelsius(props.weather.Temperature.Minimum.Value)} <img className='celsius' src={celsius} alt='#'/>
          </Typography>
          <Typography variant="body2" component="p">
          Max Temp:{changeFahrenheitToCelsius(props.weather.Temperature.Maximum.Value)} <img className='celsius' src={celsius} alt='#'/>
        </Typography>

      
      </CardContent>
     
    </Card>
    </div>
  );
}

export default Day;
