import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { storage , db, auth } from '../../firebase';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import profile from '../../profile.png'

const styles = theme => ({
  textfield: {
    margin: 20,
  }
})

class ProfileRight extends Component {

    constructor(props) {
      super(props);
      this.state = {
        name: '',
        lastname: '',
        oldPass: '',
        newPass: '',
        address: '',
        city: '',
        zip: '',
        country: '',
      };
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = () => {
      const uid = auth.currentUser.uid
      db.ref('users/' + uid + '/profile/').once('value', snapshot => {
        this.setState({
          name: snapshot.child('name').val(),
          lastname: snapshot.child('lastname').val(),
          address: snapshot.child('address').val(),
          city: snapshot.child('city').val(),
          zip: snapshot.child('zip').val(),
          country: snapshot.child('country').val(),
        })
      }).then( res => {
        console.log("get profile info")
      })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    editAccount = () => {
      const uid = auth.currentUser.uid
      var postData = { name: this.state.name, lastname: this.state.lastname}
      let ref = db.ref(`users/${uid}/profile/`)
      ref.update(postData)
      var user = auth.currentUser;
      user.updateProfile({
        displayName: this.state.name
      }).then(function() {
        console.log("Successfully updated name")
      }).catch(function(error) {
        console.log(error)
      })
    }

    updateAddress = () => {
      const uid = auth.currentUser.uid
      var postData2 = { address: this.state.address, city: this.state.city, zip: this.state.zip, country: this.state.country}
      let ref2 = db.ref(`users/${uid}/profile/`)
      ref2.update(postData2)
    }

    updatePassword = () => {
      this.reauthenticatePass(this.state.oldPass).then(() => {
      var user = auth.currentUser;
      user.updatePassword(this.state.newPass).then(function() {
        console.log("Successfully updated password")
        window.location.assign('/Profile')
      }).catch(function(error) {
        console.log(error)
        alert("The username or password is incorrect.")
      })
    }).catch((error) =>{
      alert(error)
    });
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
              <Paper style={{margin: 20, padding: 20}}>
                <Grid container direction="row" justify="center" alignItems="center" style={{backgroundColor: '#00185a'}}>
                  <Grid item>
                    <img src={profile} width="100%" style={{margin: 'auto'}}/>
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
                    onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                    style={{width: 280}}
                    />
                  <TextField
                    id="lastname"
                    label="Last Name"
                    className="classes.textfield"
                    value={this.state.lastname}
                    onChange={this.handleChange('lastname')}
                    margin="normal"
                    variant="outlined"
                    style={{width: 280}}
                    />
                  </Grid>
                <Grid container direction="row" justify="space-around" alignItems="flex-start" >
                    <Button variant="outlined" style={{marginBottom: 20}} onClick={ () => this.editAccount()}>
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
                      ovalue={this.state.oldPass}
                      onChange={this.handleChange('oldPass')}
                      margin="normal"
                      variant="outlined"
                      style={{width: 280}}
                      type="password"
                      />
                  <TextField
                    id="newPass"
                    label="New Password"
                    className="classes.textfield"
                    value={this.state.newPass}
                    onChange={this.handleChange('newPass')}
                    margin="normal"
                    variant="outlined"
                    style={{width: 280}}
                    type="password"
                    />
                </Grid>
                <Grid container direction="row" justify="space-around" alignItems="flex-start" >
                    <Button variant="outlined" style={{marginBottom: 20}} onClick={() => this.updatePassword()}>
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
                      onChange={this.handleChange('address')}
                      margin="normal"
                      variant="outlined"
                      style={{width: 280}}
                      />
                  <TextField
                    id="city"
                    label="City"
                    className="classes.textfield"
                    value={this.state.city}
                    onChange={this.handleChange('city')}
                    margin="normal"
                    variant="outlined"
                    style={{width: 280}}
                    type="text"
                    />
                </Grid>
                <Grid container direction="row" justify="space-around" alignItems="flex-start" >
                    <TextField
                      id="zip"
                      label="Zip or Postal Code"
                      className="classes.textfield"
                      value={this.state.zip}
                      onChange={this.handleChange('zip')}
                      margin="normal"
                      variant="outlined"
                      style={{width: 280}}
                      type="number"
                      />
                  <TextField
                    id="country"
                    label="Country"
                    className="classes.textfield"
                    value={this.state.country}
                    onChange={this.handleChange('country')}
                    margin="normal"
                    variant="outlined"
                    style={{width: 280}}
                    type="text"
                    />
                </Grid>
                <Grid container direction="row" justify="space-around" alignItems="flex-start" >
                    <Button variant="outlined" style={{marginBottom: 20}} onClick={() => this.updateAddress()}>
                      Update
                    </Button>
                </Grid>
              </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(ProfileRight);
