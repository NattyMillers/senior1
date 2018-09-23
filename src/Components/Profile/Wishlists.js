import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';

import Logo from '../../Logo.png'

const styles = theme => ({
  textfield: {
    margin: 20,
  },
})

const Cardstyles = {
    width: window.innerWidth/4.6,
    height: 400,
    display: 'flex',
    margin: window.innerWidth*0.03,
    borderRadius: 0,
    boxShadow: 'none',
  };

class Wishlists extends Component {

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
                    WISHLISTS
                  </Grid>
                </Grid>
                <Divider/>
                <Card style={Cardstyles}>
                  <CardActionArea>
                    <CardContent>
                      <img src={Logo} width="250" height="270" style={{margin: 5}}/>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Wishlists);
