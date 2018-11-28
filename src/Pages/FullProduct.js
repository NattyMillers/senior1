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
import axios from "./AxiosConfigurations";
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

import { auth, storage , db } from '../firebase';

// import WishlistButt from '../Components/FullProduct/WishlistButt';
// import BuyingButt from '../Components/FullProduct/BuyingButt';
import RightCard from '../Components/FullProduct/AdminVSCust';

const Imagestyles = {
  objectFit: 'contain',
}

const CardLeft = {
    width: window.innerWidth/2.3,
    height: 530,
    marginTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
    marginBottom: 20,
    // margin: 'auto',
  };

const CardRight = {
    width: window.innerWidth/2.3,
    height: 530,
    marginTop: 20,
    marginBottom: 20,
    // margin: 'auto',
  };

class FullProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      taken: '',
      cap: '',
      addDate: '',
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
    console.log(" in FullProduct");
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authenticated: true });
      } else {
        this.setState({ authenticated: false });
      }
    });
    this.getData()
    console.log(this.state.authenticated);
  }

  getData = () => {
    db.ref('products/'+this.props.match.params.id).once('value', snapshot=> {
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
      this.getURL2()
    })
  }

  getURL2 = () => {
    for (var i=1; i< this.state.num+1; i++){
      var im = storage.ref().child(this.props.match.params.id).child(this.state.name + i)
      im.getDownloadURL().then((url) => {
        var newArray = this.state.imagesURL.slice();
        newArray.push(url);
        this.setState({ imagesURL: newArray})
      })
    }
  }

  carouse = () => {
    return (
      this.state.imagesURL.map((item) =>
        <img src={item} style={Imagestyles} style={{marginRight: 'auto', marginLeft: 'auto', marginTop: 30, display: 'block', maxWidth: '450px', minHeight: '450px'}}/>
      )
    )
  }

  addQueue = (proId, proName) => { //check if it's already queued then unqueue and remove from database
      let dataQ = ''
      console.log("add queue in FullProduct");
      console.log(auth.currentUser !== null);
      if (auth.currentUser !== null){
        this.props.history.push({
            pathname: '/PayWithOmise',
            // state: { product: this.props.proId, name: this.state.name, amount: this.state.price }
            state: { product: proId, name: proName, amount: this.state.price }
        })
        console.log("1");
      }
      else{
        alert("Please Login")
      }
  }


  notLoginCust = () => {
    return (
        <Card style={CardRight}>
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
        </Card>
      )
  }

  render () {
    // let wholepage;
    // if (this.state.authenticated && auth.currentUser.uid === 'NO4iXGOyi1PZrrgxpSiGe8I3Udm2'){
    //     wholepage = this.admin()
    // }else{
    //   wholepage = this.customer()
    // }

    return (
      <div style={{backgroundColor: '#EEEEEE'}}>
        <Grid container direction="row" justify="space-around" alignItems="center">
          <Card style={CardLeft}>
            <Carousel>
              {this.carouse()}
            </Carousel>
          </Card>
          {this.state.authenticated? <RightCard proId={this.props.match.params.id} queue={this.addQueue}/> : this.notLoginCust()}
        </Grid>
      </div>
    )
  }
}


export default FullProduct;
