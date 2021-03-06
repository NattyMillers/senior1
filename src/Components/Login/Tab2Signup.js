import React, { Component } from 'react';
import firebase, { auth, db } from '../../firebase';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import logo from '../../signuplogo.png'

class Tab2Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => {
      var user = auth.currentUser;
      if (this.state.name  !== ''){
        user.updateProfile({
        displayName: this.state.name,
        }).then(function() {
        // Update successful.
        })
      }  
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

  nameHandler = (event) => {
    this.setState({ name : event.target.value})
  }


    render() {
        return (
          <div>
            <Typography component="div" style={{ padding: 8 * 3 }}>
              <DialogTitle id="scroll-dialog-title" style={{display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',}}>
                <img src={logo} onClick={(e) => this.toMain(e)} width="250" />
                <br/>
                <br/>
                <Typography variant="subheading" style={{color: '#60b0f4', }} gutterBottom>
                Sign up for an account
                </Typography>
              </DialogTitle>
              <DialogContent >
                <form onSubmit={this.onSubmit} autoComplete="off">
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="First Name"
                    name="firstname"
                    margin="normal"
                    onChange={this.nameHandler}
                  />
                  <br/>
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
                    id="password"
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
                                    backgroundColor:'#60b0f4',
                                    width: 300,
                                    height: 60,
                                    marginLeft: 10}}>
                    SIGN UP
                  </Button>
                  </form>
                </DialogContent>
                <DialogActions style={{display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',}}>

                <Divider/>
              </DialogActions>
            </Typography>
          </div>
        );
    }
}

export default Tab2Signup;
