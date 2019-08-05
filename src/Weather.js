import React, { Component } from 'react';
import { connect } from "react-redux";
import Search from './Search';
import Container from '@material-ui/core/Container';
import Daily from './Daily';

class Weather extends Component {
  render() {
    return <div className={'Weather ' + this.props.theme}> 
          <Container >
               <Search/>
               <Daily/>
          </Container>
          </div>
  }
}

const mapStateToProps = (state) => {
  return { theme: state.theme };
}

export default connect(mapStateToProps)(Weather);
