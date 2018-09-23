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
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <TextField
                      id="name"
                      label="Name"
                      className="classes.textfield"
                      value={this.state.name}
                      margin="normal"
                      />
                  </Grid>
                  <Grid item xs={6}>
                  <TextField
                    id="lastname"
                    label="Lastname"
                    className="classes.textfield"
                    value={this.state.lastname}
                    margin="normal"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <TextField
                      id="email"
                      label="Email"
                      className="classes.textfield"
                      value={this.state.email}
                      margin="normal"
                      />
                  </Grid>
                </Grid>
                <Grid container spacing={24}>
                  <Grid item xs={5}>
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" style={{marginBottom: 20}}>
                      Submit
                    </Button>
                  </Grid>
                </Grid>

                <Divider />

                <Grid container spacing={24} style={{marginTop: 20}}>
                  <Grid item xs={4}>
                    Update Password
                  </Grid>
                </Grid>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <TextField
                      id="oldPass"
                      label="Old Password"
                      className="classes.textfield"
                      value={this.state.oldPass}
                      margin="normal"
                      />
                  </Grid>
                  <Grid item xs={6}>
                  <TextField
                    id="newPass"
                    label="New Password"
                    className="classes.textfield"
                    value={this.state.newPass}
                    margin="normal"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={24}>
                  <Grid item xs={5}>
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" style={{marginBottom: 20}}>
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(ProfileRight);
