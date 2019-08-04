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



const useStyles = makeStyles({
  card: {
    minWidth: 230,
   
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
  console.log(props.weather.Day.IconPhrase)
  return (
    <div className="Day">
      <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {detectDay(props.index)}
        </Typography>
        
        { props.weather.Day.IconPhrase === 'Sunny' ? <img className='sun' src={sunny} alt='#'/>: (props.weather.Day.IconPhrase === 'Mostly sunny' ? <img className='sun' src={mostlySunny} alt='#'/>: (props.weather.Day.IconPhrase === 'Partly sunny' ? <img className='sun' src={partlySunny} alt='#'/>: null))}
        <Typography className={classes.pos} color="textSecondary">
         Day: {props.weather.Day.IconPhrase}
        </Typography>
        { props.weather.Night.IconPhrase === 'Clear' ? <img className='sun' src={clear} alt='#'/>: (props.weather.Night.IconPhrase === 'Mostly clear' ? <img className='sun' src={mostlyClear} alt='#'/>:(props.weather.Night.IconPhrase === 'Partly cloudy' ? <img className='sun' src={partlyCloudy} alt='#'/>: (props.weather.Night.IconPhrase === 'Mostly cloudy' ? <img className='sun' src={cloudy} alt='#'/>: null)))}

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
