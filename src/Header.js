import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Weather from './Weather';
import Favorite from './Favorite';
import Daily from './Daily';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import herolo from './img/herolo.png';
import './Header.css';


function Header() {

  const classes = useStyles();

  return (
    <div className="Header">
    <Router>

      <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img className='logo' src={herolo} alt='#'/>
            Herolo Daily Weather Forcast
          </Typography>
          <MenuItem className={classes.font}><Link  to="/">Weather</Link> </MenuItem>
          <MenuItem className={classes.font}><Link to="/favorite/" >Favorite</Link></MenuItem>
        </Toolbar>
      </AppBar>
    </div>
       
          

        <Switch>
          <Route path="/" exact render={(props)=><Weather {...props}/>} />
          <Route path="/favorite"  render={(props)=><Favorite {...props}/>} />
          <Route  render={(props)=><Daily {...props}/>} />
        </Switch>
     
    </Router>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  appBar:{
    backgroundColor: '#DCDCDC',
    opacity:0.8,
    border: '1px solid #D3D3D3'
  },
  title: {
    color:'#696969',
    flexGrow: 1,
    
  },
  font: {
    opacity: 0.6
  },
  root:{
    background: 'linear-gradient(45deg, #FFFACD 30%, #808080 90%)'
  }
  
}));

export default Header;
