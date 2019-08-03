import React, { Component } from 'react';
import './Favorite.css';
import { connect } from "react-redux";
import CardFav from './CardFavorite';


class Favorite extends Component {
  state={
    all: []
  }
  componentDidMount()
  {
    debugger
    const allData = JSON.parse(localStorage.getItem('data'));
    const newArr = [allData]
    this.setState({
      all: newArr
    })
  }
  render() {
    return <div className='favorite'>
          
            <h1 className='headline'>My Favorite</h1>
            {this.state.all.length>0 ? this.state.all.map(function(city,i){debugger 
              return <CardFav key={i} city={city}/>}): null}
            {this.props.cityArr.length!== 0 ? this.props.cityArr.map((city,i)=><CardFav key={i} city={city}/>):null}
          </div>;
    }
}

const mapStateToProps=(state)=>
{
  return {cityArr: state.allcities}
}

let favorite = connect(mapStateToProps,null)(Favorite)

export default favorite;
