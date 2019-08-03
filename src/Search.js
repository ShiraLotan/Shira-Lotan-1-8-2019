import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { searchCity } from './Action';
import { connect } from "react-redux";

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



function Search(props) {
  const [searchName, setSearchName] = useState('');

  const handelChangeName=(ev)=>
      {
        setSearchName({
          searchName: ev.target.value
        })
      };

  const handleSearch=async()=>
      {
          props.searchCityName(searchName)
      }
  const classes = useStyles();

    return  <div className='Search'>
               <div className='searchInp'>
                <div className={classes.search}>
                 
                    <InputBase 
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={handelChangeName}
                    />
                  
                </div>
                <Button onClick={handleSearch} variant="contained" color="default" className={classes.button}>
                      Search
                    </Button>
                
                
            </div>
          </div>;
  
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

export default search;
