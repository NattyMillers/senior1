import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

import CardItem from '../Components/MainPage/CardItems'
import SortBy from '../Components/MainPage/SortBy'

class Main extends Component {

  constructor(props) {
    super(props);
  }

  handleClick = (val) => {
    this.props.history.push('/fullproduct/' + val)
  }

    render() {
        return (
            <div style={{textAlign: "center", backgroundColor: '#EEEEEE'}}>
              <Paper style={{ padding: 20, boxShadow: 'none', backgroundColor: '#EEEEEE'}}>
                <SortBy/>
              </Paper>
              <CardItem butto={this.handleClick}/>
            </div>
        );
    }
}

export default Main;
