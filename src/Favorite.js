import React, { Component } from 'react';
import './Favorite.css';
import { connect } from "react-redux";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Favorite extends Component {
  render() {
    return <div className='favorite'>
          
            <h1 className='headline'>My Favorite</h1>
            {/* {this.props.weather.map(city=> console.log(city))} */}
                      <Card className='card'>
                <CardContent>
                  <Typography  color="textSecondary" gutterBottom>
                    Word of the Day
                  </Typography>
                  <Typography variant="h5" component="h2">
                    be
                    
                    lent
                  </Typography>
                  <Typography color="textSecondary">
                    adjective
                  </Typography>
                  <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
          </div>;
    }
}

const mapStateToProps=(state)=>
{
  return {cityArr: state}
}

let favorite = connect(mapStateToProps,null)(Favorite)

export default favorite;
