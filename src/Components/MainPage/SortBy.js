import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class SortBy extends Component {

    render() {
        return (
            <div style={{textAlign: "center", backgroundColor: '#EEEEEE'}}>
              <Paper style={{margin: 20, padding: 20, }}>
                <Button variant="outlined" style={{marginRight: 20}}>
                  Popular
                </Button>
                <Button variant="outlined" style={{marginRight: 20}}>
                  New In
                </Button>
                <Button variant="outlined" style={{marginRight: 20}}>
                  Low to High
                </Button>
                <Button variant="outlined" style={{marginRight: 20}}>
                  High to Low
                </Button>
              </Paper>
            </div>
        );
    }
}

export default SortBy;
