import React from 'react';
import { withRouter } from 'react-router-dom';
import ooops from './img/ooops.png';
import './ErrorHandle.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';




function ErrorRespond(props) {

  const backToWeather=()=>
{
  props.history.push('/weather')
}
  return <div className='error'>
              <img src={ooops} className='ooops' alt='#'/>
              <img src={ooops} className='ooops1' alt='#'/>
              <Paper className='note'>
                <Typography variant="h5" component="h3">
                  Something went wrong
                </Typography>
                <Typography component="p">
                  please try again later
                </Typography>
                <Button onClick={backToWeather} variant="outlined" className='backButton'>
                  Back
                </Button>
              </Paper>

          </div>
  }


export default withRouter(ErrorRespond)