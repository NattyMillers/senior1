import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {GoogleLoginButton} from 'react-social-login-buttons';
import Grid from '@material-ui/core/Grid';

import logo from '../../loginlogo.png'
import firebase, { auth, db } from '../../firebase';

class Tab1Login extends Component {

  constructor(props) {
      super(props);
      this.state = {
          email : "",
          password : ""
      }
      this.onSubmit = this.onSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    console.log("credential:   " + credential)
    auth.signInWithCredential(credential)
    .then(authUser => {
        console.log(authUser);
        this.props.butty();
    })
    .catch(authError => {
        alert(authError);
    })
  }

  handleChange = name => event => {
    this.setState({
        [name]: event.target.value,
    });
  };

  loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      console.log(token)
      // The signed-in user info.
      var user = result.user;
      console.log(user)
      // ...
    }).catch(function(error) {
      // Handle Errors here.

      var errorCode = error.code;
      console.log(errorCode)
      var errorMessage = error.message;
      console.log(errorMessage)
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(credential)

      // ...
    });
  }

    render() {
        return (
          <div >
            <Typography component="div" style={{ padding: 8 * 3 }}>
              <DialogTitle id="scroll-dialog-title" style={{display: 'flex',alignItems: 'center',justifyContent: 'center',}}>
                <img src={logo} onClick={(e) => this.toMain(e)} width="250" />
                <br/>
                <br/>
                <Typography variant="subheading" style={{color: '#00185a'}} gutterBottom>
                Sign in your account
                </Typography>
              </DialogTitle>
              <DialogContent >
                <form onSubmit={this.onSubmit} autoComplete="off">
                  <TextField
                    variant="outlined"
                    label="Email"
                    type="email"
                    name="email"
                    margin="normal"
                    onChange={this.handleChange('email')}
                    fullWidth
                  />
                  <br/>
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange('password')}
                    fullWidth
                  />
                  <br/>
                  <br/>
                  <Button type="submit" style={{ color: 'white',
                                    fontSize: 18,
                                    backgroundColor:'#00185a',
                                    width: 300,
                                    height: 60}}>
                    LOGIN
                  </Button>
                </form>
              </DialogContent>
              <Divider/>
              <DialogActions >
                <Grid container direction="column" justify="center" alignItems="center" >
                  <GoogleLoginButton style={{display:'flex', height: 60, width: 300}} onClick={() => this.loginWithGoogle()} />
                </Grid>
              </DialogActions>
            </Typography>
          </div>
        );
    }
}

export default Tab1Login;
