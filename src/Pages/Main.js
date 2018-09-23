import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import CardItem from '../Components/MainPage/CardItems'
import SortBy from '../Components/MainPage/SortBy'

class Main extends Component {

    render() {
        return (
            <div style={{textAlign: "center"}}>
              <Paper style={{margin: 20, padding: 20, boxShadow: 'none'}}>
                <SortBy/>
              </Paper>
              <CardItem/>
            </div>
        );
    }
}

export default Main;
