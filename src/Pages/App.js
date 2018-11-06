import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
// import './index.css';
import firebase, { auth, db } from '../firebase';

import logo from '../frontlog.png'

import Login from '../Components/Login/Login'
import SearchBar from '../Components/NavBar/SerchBar2'
import Main from './Main'
import Profile from './Profile'
// import AppBar from '../Components/NavBar/AppBarr'
import FullProduct from './FullProduct'
import Admin from './Admin'

import CircularProgress from '@material-ui/core/CircularProgress';
import PrivateRoute from './PrivateRoute';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
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

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: true,
      open: false,
      scroll: 'paper',
      open2: false,
      isAdmin: false,
      nameUser: '',
    };
  }

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loading: false, authenticated: true });
      } else {
        this.setState({ loading: false, authenticated: false });
      }
    });
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
    // e.preventDefault();
    console.log(this.props);
    this.props.history.push('/')
  }

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseWithLogin = () => {
    this.setState({ open: false });
    var user = firebase.auth().currentUser;
    const uid = auth.currentUser.uid;
    if (user) {
      console.log(this.state.authenticated);
      this.setState({ authenticated: true });
      if (uid === 'TvRI4dswQTVlZGODw1V8ioafNGg2'){
        this.setState({ isAdmin: true });
      }
    } else {
      console.log(this.state.authenticated);
      this.setState({ authenticated: false });
    }
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

  logout = () => {
    auth.signOut()
    this.setState({
      authenticated: false,
      isAdmin: false
    })
  }

  menuListForCust = () => {
    return (
      <MenuList position="relative" zIndex="100">
        <MenuItem onClick={() => this.toProfile()}>Profile</MenuItem>
        <MenuItem onClick={() => this.toWishlists()}>Wishlists</MenuItem>
        <MenuItem onClick={() => this.toNotification()}>Notifications</MenuItem>
        <MenuItem onClick={() => this.toQueue()}>Queue</MenuItem>
        <MenuItem onClick={() => this.logout()}>Logout</MenuItem>
      </MenuList>
    )
  }

  menuListForAdmin = () => {
    return (
      <MenuList>
        <MenuItem onClick={() => this.toAdmin()}>Admin</MenuItem>
      </MenuList>
    )
  }

  loginLeaw = () => {
    const { open2 } = this.state;
    const uid = auth.currentUser.uid;
    db.ref('users/' + uid + '/profile').once('value').then(snapshot => {
      this.setState({ nameUser: snapshot.child('name').val()})
    }).then( res => {
    })

    if (uid === 'TvRI4dswQTVlZGODw1V8ioafNGg2'){
      this.setState({ isAdmin: true });
    }

    return (
      <div>
        <Grid container direction="row" justify="space-evenly" alignItems="center">
          <Typography style={{marginRight: 10}}> Hi {this.state.nameUser}! </Typography>
          <Button color="#1c4587" buttonRef={node => {this.anchorEl = node;}}
                                aria-owns={open2 ? 'menu-list-grow' : null}
                                aria-haspopup="true"
                                onClick={this.handleToggle}>
          <MenuIcon style={{color: '#f15722'}} />
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
                  {this.state.isAdmin? this.menuListForAdmin() : this.menuListForCust()}
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </div>
    )
  }

  notLogin = () => {
    return (
      <div>
        <Button color="inherit" onClick={this.handleClickOpen('body')} style={{color: '#1e43ae'}}>
          Log in / Sign up
        </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            scroll={this.state.scroll}
            aria-labelledby="scroll-dialog-title"
          >
          <Login butty={this.handleCloseWithLogin}/>
        </Dialog>
      </div>

    )
  }

  render() {
    const { loading } = this.state.loading
    const content = loading ? (
            <div align="center">
                <CircularProgress size={80} thickness={5} />
            </div>
        ) : (
            <div>
                <Route exact path="/" component={Main} />
                <PrivateRoute exact path="/profile" component={Profile} authenticated={this.state.authenticated}/>
                <Route exact path="/fullproduct/:id" component={FullProduct} />
                <PrivateRoute exact path="/admin" component={Admin} authenticated={this.state.authenticated}/>
            </div>
        );
    return(
      <div>
        <AppBar position="static" style={{backgroundColor:"#ffe900", overflow: 'visible', height: 85}} >
          <Toolbar >
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Typography variant="title" color="inherit">
                  <img style={{marginTop: 0}} src={logo} onClick={(e) => this.toMain(e)} width="150" />
                </Typography>
                <div style={{width: '43%'}}>

                <SearchBar butt={this.handleSubmit}/>

                </div>

                {this.state.authenticated? this.loginLeaw() : this.notLogin()}

            </Grid>
          </Toolbar>
        </AppBar>
        <br />
        { content }
      </div>
    )
  }
}

export default withRouter(App);
// registerServiceWorker();
