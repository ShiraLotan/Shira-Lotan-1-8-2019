import React, { Component } from 'react';
import './Favorite.css';
import { connect } from "react-redux";
import CardFav from './CardFavorite';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import sunny from './img/sunny.png';
import partlyCloudy from './img/partlyCloudy.jpeg';

class Favorite extends Component {
  state = {
    all: this.props.cityArr
  }

  render() {
    return <div className='favorite'>

      <h1 className='headline'>My Favorite</h1>
      {this.props.cityArr.length !== 0 ? this.props.cityArr.map(function (city, i) {
        return <CardFav key={i} city={city} />
      }) : <Card className='noFav'><Typography className='emptyHeadline' color="textSecondary" gutterBottom>You Are Currently Not Following Any City</Typography>
          <div className='allImg'>
            <img className='imgsEmptyFav' src={sunny} alt='#' />
            <img className='imgsEmptyFav' src={partlyCloudy} alt='#' /></div></Card>}
    </div>;
  }
}

const mapStateToProps = (state) => {
  return { cityArr: state.allcities }
}

let favorite = connect(mapStateToProps)(Favorite)

export default favorite;
