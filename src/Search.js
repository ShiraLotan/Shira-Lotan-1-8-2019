import React, { Component } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { searchCity } from './Action';
import { connect } from "react-redux";

class Search extends Component {
  state={
    searchName:''
  }

 handelChangeName=(ev)=>
      {
        this.setState({
          searchName: ev.target.value
        })
      };

handleSearch=async()=>
      {
        this.props.searchCityName(this.state.searchName)
      }
classes =()=> useStyles();

render(){

    return  <div className='Search'>
               <div className='searchInp'>
                <div className={this.classes.search}>
                 
                    <InputBase 
                      placeholder="Search…"
                      classes={{
                        root: this.classes.inputRoot,
                        input: this.classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={this.handelChangeName}
                    />
                  
                </div>
                <Button onClick={this.handleSearch} variant="contained" color="default" className={this.classes.button}>
                      Search
                    </Button>
                
                
            </div>
          </div>;
  }
}

const mapDispatchToProps = function(dispatch){
  let obj = {
      searchCityName: function(data){
        dispatch(searchCity(data))
      }
    } 
    return obj
  }

let search = connect(null,mapDispatchToProps)(Search)

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  button: {
    margin: theme.spacing(1),
    width:'170px',
    position: 'relative',
    left: '18px',    
    background: 'linear-gradient(45deg, #F0FFFF 70%, #8A2BE2 90%)'

  },
}));
export default search;
