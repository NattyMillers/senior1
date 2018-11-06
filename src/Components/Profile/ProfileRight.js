import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
  textfield: {
    margin: 20,
  }
})

class ProfileRight extends Component {

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
                    PROFILE
                  </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={24} style={{marginTop: 20}}>
                  <Grid item xs={4}>
                    Account Details
                  </Grid>
                </Grid>
                <Grid container direction="row" justify="space-around" alignItems="flex-start" >
                    <TextField
                      id="name"
                      label="First Name"
                      className="classes.textfield"
                      value={this.state.name}
                      margin="normal"
                      variant="outlined"
                      style={{width: 280}}
                      />
                  <TextField
                    id="lastname"
                    label="Last Name"
                    className="classes.textfield"
                    value={this.state.lastname}
                    margin="normal"
                    variant="outlined"
                    style={{width: 280}}
                    />
                  </Grid>
                  <Grid container direction="row" justify="space-around" alignItems="flex-start" >
                    <TextField
                      id="email"
                      label="Email"
                      className="classes.textfield"
                      value={this.state.email}
                      margin="normal"
                      variant="outlined"
                      style={{width: 280}}
                      />
                    <TextField
                      id="confirmemail"
                      label="Confirm Email"
                      className="classes.textfield"
                      margin="normal"
                      variant="outlined"
                      style={{width: 280}}
                      />
                    </Grid>
                <Grid container direction="row" justify="space-around" alignItems="flex-start" >
                    <Button variant="outlined" style={{marginBottom: 20}}>
                      Submit
                    </Button>
                </Grid>

                <Divider />

                <Grid container spacing={24} style={{marginTop: 20}}>
                  <Grid item xs={4}>
                    Update Password
                  </Grid>
                </Grid>
                <Grid container direction="row" justify="space-around" alignItems="flex-start" >
                    <TextField
                      id="oldPass"
                      label="Old Password"
                      className="classes.textfield"
                      value={this.state.oldPass}
                      margin="normal"
                      variant="outlined"
                      style={{width: 280}}
                      />
                  <TextField
                    id="newPass"
                    label="New Password"
                    className="classes.textfield"
                    value={this.state.newPass}
                    margin="normal"
                    variant="outlined"
                    style={{width: 280}}
                    />
                </Grid>
                <Grid container direction="row" justify="space-around" alignItems="flex-start" >
                    <Button variant="outlined" style={{marginBottom: 20}}>
                      Update
                    </Button>
                </Grid>

                <Divider />

                <Grid container spacing={24} style={{marginTop: 20}}>
                  <Grid item xs={4}>
                    Shipping Address
                  </Grid>
                </Grid>
                <Grid container direction="row" justify="space-around" alignItems="flex-start" >
                    <TextField
                      id="address"
                      label="Address"
                      className="classes.textfield"
                      value={this.state.address}
                      margin="normal"
                      variant="outlined"
                      style={{width: 280}}
                      />
                  <TextField
                    id="city"
                    label="City"
                    className="classes.textfield"
                    value={this.state.city}
                    margin="normal"
                    variant="outlined"
                    style={{width: 280}}
                    />
                </Grid>
                <Grid container direction="row" justify="space-around" alignItems="flex-start" >
                    <TextField
                      id="zip"
                      label="Zip or Postal Code"
                      className="classes.textfield"
                      value={this.state.zip}
                      margin="normal"
                      variant="outlined"
                      style={{width: 280}}
                      />
                  <TextField
                    id="country"
                    label="Country"
                    className="classes.textfield"
                    value={this.state.country}
                    margin="normal"
                    variant="outlined"
                    style={{width: 280}}
                    />
                </Grid>
                <Grid container direction="row" justify="space-around" alignItems="flex-start" >
                    <Button variant="outlined" style={{marginBottom: 20}}>
                      Update
                    </Button>
                </Grid>
              </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(ProfileRight);
