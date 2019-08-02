import React from 'react';
import Header from './Header';
import './App.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
 
}));

function App() {

  const classes = useStyles();

  return (
    <div className='App'>
          <div className={classes.root}>
            <Grid container   alignItems="center" spacing={3}>
              <Grid item xs={12}>
                <Header/>
              </Grid>
            </Grid>
        </div>
    </div>
  );
}

export default App;
