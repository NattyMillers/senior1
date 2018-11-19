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
import PayWithOmise from './PayWithOmise'
import Thankyou from './Thankyou'

import CircularProgress from '@material-ui/core/CircularProgress';
import PrivateRoute from './PrivateRoute';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Badge from '@material-ui/core/Badge';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import TagFacesIcon from '@material-ui/icons/TagFaces';
import PersonIcon from '@material-ui/icons/Person';
import FavIcon from '@material-ui/icons/Favorite';
import NotiIcon from '@material-ui/icons/Notifications';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AddIcon from '@material-ui/icons/AddCircle';

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
      read: '',
      top: false,
    };
  }

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ loading: false, authenticated: true });
        let read = 0
        const uid = auth.currentUser.uid
        if (uid !== "TvRI4dswQTVlZGODw1V8ioafNGg2"){
          db.ref('users/' + uid + '/notifications').once('value').then(snapshot => {
            for (let item in snapshot.val()){
              if (snapshot.val()[item].read === false){
                read += 1
              }
            }
          }).then( res => {
            this.setState({ read: read})
          })
        }
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

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  whichTab = (tab) => {
    if (tab === 'Profile'){
      this.toProfile()
    }
    if (tab === 'Wishlists'){
      this.toWishlists()
    }
    if (tab === 'Notifications'){
      this.toNotification()
    }
    if (tab === 'Orders'){
      this.toQueue()
    }
  }

  loginLeaw = () => {
    const { open2 } = this.state;
    const uid = auth.currentUser.uid;
    db.ref('users/' + uid + '/profile').once('value').then(snapshot => {
      this.setState({ nameUser: snapshot.child('name').val()})
    }).then( res => {

    })

    // if (uid === 'TvRI4dswQTVlZGODw1V8ioafNGg2'){
    //   this.setState({ isAdmin: true });
    // }

    // onClick={this.handleToggle}>

    const adminList = (
      <div style={{width: 250}}>
        <List>
          <ListItem button key="Add new product" onClick={() => this.toAdmin()}>
            <AddIcon />
            <ListItemText primary="Add new product" />
          </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button key="Logout" onClick={() => this.logout()}>
              <LockOpenIcon />
              <ListItemText primary="Logout" />
            </ListItem>
        </List>
      </div>
    );

    const logoList = [ <PersonIcon/>, <FavIcon/>, <NotiIcon/>, <TagFacesIcon/>]

    const custList = (
      <div style={{width: 250}}>
        <List>
          {['Profile', 'Wishlists', 'Notifications', 'Orders'].map((text, index) => (
            <ListItem button key={text} onClick={() => this.whichTab(text)}>
              {logoList[index]}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
            <ListItem button key="Logout" onClick={() => this.logout()}>
              <LockOpenIcon />
              <ListItemText primary="Logout" />
            </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <Grid container direction="row" justify="space-evenly" alignItems="center">
          <Typography style={{marginRight: 10}}> Hi {auth.currentUser.displayName}! </Typography>
          <Button color="#1c4587" buttonRef={node => {this.anchorEl = node;}}
                                aria-owns={open2 ? 'menu-list-grow' : null}
                                aria-haspopup="true"
                                onClick={this.toggleDrawer('right', true)}>
            {this.state.read > 0 &&
              <Badge color="secondary" badgeContent={"!"}>
                <MenuIcon style={{color: '#f15722'}} />
              </Badge>}
            {this.state.read === 0 &&
            <MenuIcon style={{color: '#f15722'}} />}
            {auth.currentUser.uid === 'TvRI4dswQTVlZGODw1V8ioafNGg2' && <MenuIcon style={{color: '#f15722'}} />}
          </Button>

          <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('right', false)}
              onKeyDown={this.toggleDrawer('right', false)}
            >
              {auth.currentUser.uid === 'TvRI4dswQTVlZGODw1V8ioafNGg2'? adminList : custList}
            </div>
          </Drawer>
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
                <PrivateRoute exact path="/paywithomise" component={PayWithOmise} authenticated={this.state.authenticated}/>
                <Route exact path="/thankyou" component={Thankyou} />
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
