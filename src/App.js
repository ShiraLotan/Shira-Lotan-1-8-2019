import React from 'react';
import { connect } from "react-redux";
import Header from './Header';
import Snackbar from '@material-ui/core/Snackbar';
import * as Action from './Action';
import './App.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },

}));

function App({ error, setError }) {
  const handleClose = () => {
    setError(null);
  }
  const classes = useStyles();

  return (
    <div className='App'>
      <div className={classes.root}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12}>
            <Header />
          </Grid>
        </Grid>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={error}
        onClose={handleClose}
        autoHideDuration={500}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={error && <span id="message-id">{error.toString()}</span>}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { error: state.error };
}
const app= connect(mapStateToProps, { setError: Action.setError })(App)
export default app;
