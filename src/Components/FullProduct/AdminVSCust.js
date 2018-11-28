import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavIcon from '@material-ui/icons/Favorite';
import Divider from '@material-ui/core/Divider';
import CartIcon from '@material-ui/icons/ShoppingCart';
import Carousel from 'nuka-carousel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { auth, storage , db } from '../../firebase';

import WishlistButt from './WishlistButt';
import BuyingButt from './BuyingButt';

const Imagestyles = {
  objectFit: 'contain',
}

const CardRight = {
    width: window.innerWidth/2.3,
    height: 530,
    marginTop: 20,
    marginBottom: 20,
    // margin: 'auto',
  };

class AdminVSCust extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      taken: '',
      cap: '',
      addDate: '',
      picURL: '',
      picNames: [],
      imagesURL: [],
      num: '',
      detail: '',
      capCheck: '',
      takenCheck: '',
      usersId: [],
      token: '',
      authenticated: false,
      sold: false,
      open: false,
    };
  }

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authenticated: true });
      } else {
        this.setState({ authenticated: false });
      }
    });
  }

  componentDidMount() {
    console.log(" in AdminVSCust");
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authenticated: true });
      } else {
        this.setState({ authenticated: false });
      }
    });
    this.getData()
  }

  getData = () => {
    db.ref('products/'+this.props.proId).once('value', snapshot=> {
      this.setState({
        addDate: snapshot.child('addDate').val(),
        cap: snapshot.child('cap').val(),
        name: snapshot.child('name').val(),
        price: snapshot.child('price').val(),
        taken: snapshot.child('taken').val(),
        num: snapshot.child('numPic').val(),
        detail: snapshot.child('detail').val(),
      })
      if (snapshot.child('cap').val() == snapshot.child('taken').val()){
        this.setState({sold: true})
      }
      // console.log(snapshot.val());
    }).then( res => {

    })
  }

  addQueue = (proId, proName) => {
    this.props.queue(proId, proName)
  }

  handleChange = name => event => {
      this.setState({
          [name]: event.target.value,
      });
  };

  customer = () => {
    return (
      <Card style={CardRight}>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <CardContent>
            <Typography component="h2" variant="display1" >
              {this.state.name.replace(/_/g, " ")}
            </Typography>
            <br/>
            <Typography component="h2" variant="headline" gutterBottom>
              {this.state.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} THB
            </Typography>
            {this.state.sold && <Typography component="h1" variant="display1" style={{color: 'red'}} gutterBottom>SOLD OUT</Typography>}
            <Divider style={{width: window.innerWidth/2.5}}/>
            <br/>
            <Typography component="h2" variant="subheading" gutterBottom>
            Taken: {this.state.taken}
            </Typography>
            <Typography component="h2" variant="subheading" gutterBottom>
            Capacity: {this.state.cap}
            </Typography>
            <Typography component="h2" variant="subheading" gutterBottom>
            Detail: {this.state.detail}
            </Typography>
          </CardContent>
        </Grid>
        <CardActions>
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            {this.state.authenticated && <WishlistButt proId={this.props.proId}/>}
            {this.state.authenticated && <BuyingButt proId={this.props.proId} queue={this.addQueue}/>}
          </Grid>
        </CardActions>
      </Card>
    )
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseAgree = () => {
    var changeData = { price: this.state.price, cap: this.state.cap, detail: this.state.detail, taken: 0}
    let ref = db.ref(`products/${this.props.proId}/`)
    ref.update(changeData)
    this.setState({ open: false });
  };

  handleCloseDisagree = () => {
    var changeData = { price: this.state.price, cap: this.state.cap, detail: this.state.detail}
    let ref = db.ref(`products/${this.props.proId}/`)
    ref.update(changeData)
    this.setState({ open: false });
  };

  admin = () => {
    return (
      <Card style={CardRight}>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <CardContent>
            <Typography component="h2" variant="display1" >
              {this.state.name.replace(/_/g, " ")}
            </Typography>
            <br/>
            <TextField
              label="Price"
              value={this.state.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              onChange={this.handleChange('price')}
              margin="normal"
              variant="outlined"
            />
            {this.state.sold && <Typography component="h1" variant="display1" style={{color: 'red'}} gutterBottom>SOLD OUT</Typography>}
            <Divider style={{width: window.innerWidth/2.5}}/>
            <br/>
            <Typography component="h2" variant="subheading" gutterBottom>
            Taken: {this.state.taken}
            </Typography>
            <TextField
              label="Capacity"
              value={this.state.cap}
              onChange={this.handleChange('cap')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Detail"
              value={this.state.detail}
              onChange={this.handleChange('detail')}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </CardContent>
        </Grid>
        <CardActions>
          <Button onClick={() => this.handleClickOpen()} variant="outlined" size="large" color="secondary" style={{borderRadius: 15, margin: 'auto'}}>Submit Changes</Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Do you want to reset **TAKEN**?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Be remind! If you agree to reset the **taken**, all the customers that have bought this item will be reset.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleCloseDisagree()} color="primary">
                Disagree
              </Button>
              <Button onClick={() => this.handleCloseAgree()} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
    )
  }

  render () {
    return (
      <div style={{backgroundColor: '#EEEEEE'}}>
         {auth.currentUser.uid === 'NO4iXGOyi1PZrrgxpSiGe8I3Udm2'? this.admin() : this.customer()}
      </div>
    )
  }
}


export default AdminVSCust;
