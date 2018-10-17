import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
  textfield: {
    margin: 20,
  }
})

class Queue extends Component {

    state = {
      name: '',
      lastname: '',
      email: '',
      oldPass: '',
      newPass: '',
    };

    render() {
        return (
            <div style={{textAlign: "center"}}>
              <Paper style={{margin: 20, padding: 20}}>
                <Grid container spacing={24} style={{marginBottom: 10}}>
                  <Grid item xs={5}>
                  </Grid>
                  <Grid item>
                    QUEUE
                  </Grid>
                </Grid>
                <Divider/>
              </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Queue);
