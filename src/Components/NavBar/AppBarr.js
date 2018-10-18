import React, { Component } from 'react';

import logo from '../../LogoBlue.png'
// import SearchBar from './SearchBar'
import Login from '../Login/Login'
import SearchBar from './SerchBar2'

// import registerServiceWorker from './registerServiceWorker';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import SearchIcon from '@material-ui/icons/Search';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


class AppBarr extends Component{
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
      loading: true,
      open: false,
      scroll: 'paper',
      open2: false,
    };
  }

  toProfile = event => {
    this.setState({ open2: false });
    this.props.history.push({
        pathname: '/profile',
        state: { page: 0 }
    })
  }

  toWishlists = event => {
    this.setState({ open2: false });
    this.props.history.push({
        pathname: '/profile',
        state: { page: 1 }
    })
  }

  toNotification = event => {
    this.setState({ open2: false });
    this.props.history.push({
        pathname: '/profile',
        state: { page: 2 }
    })
  }

  toQueue = event => {
    this.setState({ open2: false });
    this.props.history.push({
        pathname: '/profile',
        state: { page: 3 }
    })
  }

  toAdmin = event => {
    this.setState({ open2: false });
    this.props.history.push('/admin')
  }

  toMain = (e) => {
    e.preventDefault();
    console.log(this.props);
    this.props.history.push('/')
  }

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (val) => {
    this.props.history.push('/fullproduct/' + val)
  }

  handleToggle = () => {
    this.setState(state => ({ open2: !state.open }));
  };

  handleClose2 = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open2: false });
  };

  render() {
    const { loading } = this.state;
    const { open2 } = this.state;
    return(
      <div>
      <AppBar position="static" style={{backgroundColor:"white"}} >
        <Toolbar >
          <Grid container direction="row" justify="space-between" alignItems="center">
              <Typography variant="title" color="inherit">
                <img src={logo} onClick={(e) => this.toMain(e)} width="140" />
              </Typography>
              <div style={{width: '43%'}}>

              <SearchBar butt={this.handleSubmit}/>

              </div>

              <div>
                <Button color="inherit" onClick={this.handleClickOpen('body')} style={{color: '#1c4587'}}>
                  Log in
                </Button>
                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    scroll={this.state.scroll}
                    aria-labelledby="scroll-dialog-title"
                  >
                  <Login/>
                </Dialog>
              </div>
              <div>
              <Button color="#1c4587" buttonRef={node => {this.anchorEl = node;}}
                                    aria-owns={open2 ? 'menu-list-grow' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleToggle}>
              <MenuIcon />
              </Button>
              <Popper open={open2} anchorEl={this.anchorEl} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose2}>
                      <MenuList>
                        <MenuItem onClick={() => this.toProfile()}>Profile</MenuItem>
                        <MenuItem onClick={() => this.toWishlists()}>Wishlists</MenuItem>
                        <MenuItem onClick={() => this.toNotification()}>Notifications</MenuItem>
                        <MenuItem onClick={() => this.toQueue()}>Queue</MenuItem>
                        <MenuItem onClick={() => this.toAdmin()}>Admin</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      </div>
    )
  }
}

export default AppBarr;
