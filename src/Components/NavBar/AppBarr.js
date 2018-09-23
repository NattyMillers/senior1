import React, { Component } from 'react';

import logo from '../../Logo.png'
import SearchBar from './SearchBar'

// import registerServiceWorker from './registerServiceWorker';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';

class AppBarr extends Component{
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
      loading: true,
    };
  }

  toMenu = (e) => {
    e.preventDefault();
    // window.location.assign('/profile')
    this.props.history.push('/profile')
  }

  toMain = (e) => {
    e.preventDefault();
    // window.location.assign('/profile')
    this.props.history.push('/')
  }

  toLogin = (e) => {
    e.preventDefault();
    // window.location.assign('/profile')
    this.props.history.push('/login')
  }

  render() {
    const { loading } = this.state;
    return(
      <div>
      <AppBar position="static" style={{backgroundColor:"#1c4587ff"}} >
        <Toolbar >
          <Grid container direction="row" justify="space-between" alignItems="center">
              <Typography variant="title" color="inherit">
                <img src={logo} onClick={(e) => this.toMain(e)} width="100" />
              </Typography>

              <SearchBar/>

              <Button color="inherit" onClick={(e) => this.toLogin(e)}>Login</Button>
              <Button color="inherit" onClick={(e) => this.toMenu(e)}><MenuIcon /></Button>

          </Grid>
        </Toolbar>
      </AppBar>
      </div>
    )
  }
}

export default AppBarr;
