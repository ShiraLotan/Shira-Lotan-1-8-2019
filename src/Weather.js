import React, { Component } from 'react';
import Search from './Search';
import Container from '@material-ui/core/Container';
import Daily from './Daily';

class Weather extends Component {

  render() {
    return <div className='Weather'> 
          <Container >
               <Search/>
               <Daily/>
          </Container>
          </div>
  }
}

export default Weather;
