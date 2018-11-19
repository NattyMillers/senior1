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

import { auth, storage , db } from '../firebase';

import WishlistButt from '../Components/FullProduct/WishlistButt';
import BuyingButt from '../Components/FullProduct/BuyingButt';

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
  };

const CardRight = {
    width: window.innerWidth/2.3,
    height: 530,
    marginTop: 20,
    marginBottom: 20,
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
    };
  }

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ authenticated: true });
      } else {
        this.setState({ authenticated: false });
      }
    });
  }

  componentDidMount() {
    console.log(" in FullProduct");
    this.getData()
    this.getURL()
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
      // console.log(snapshot.val());
    }).then( res => {
      this.getURL2()
    })
  }

  getURL = () => {
    var im = storage.ref().child('mainpage').child(this.props.match.params.id + '.jpg')
    im.getDownloadURL().then((url) => {
      this.setState({ picURL: url})
    })
  }

  getURL2 = () => {
    console.log(this.state.num);
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
        <img src={item} style={Imagestyles} style={{marginRight: 'auto', marginLeft: 'auto', marginTop: 30, display: 'block', maxWidth: '450px'}}/>
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
            // state: { product: this.props.match.params.id, name: this.state.name, amount: this.state.price }
            state: { product: proId, name: proName, amount: this.state.price }
        })
        console.log("1");
      }
      else{
        alert("Please Login")
      }
  }

  render () {
    return (
      <div style={{backgroundColor: '#EEEEEE'}}>
        <Grid container direction="row" justify="space-evenly" alignItems="center">
            <Card style={CardLeft}>
              <Carousel>
                {this.carouse()}
              </Carousel>
            </Card>
            <Card style={CardRight}>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <CardContent>
                  <Typography component="h2" variant="display2" >
                    {this.state.name.replace(/_/g, " ")}
                  </Typography>
                  <br/>
                  <Typography component="h1" variant="display1" gutterBottom>
                    {this.state.price} THB
                  </Typography>
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
                  <Divider style={{width: window.innerWidth/2.5}}/>
                  <br/>
                  {this.state.authenticated && <WishlistButt proId={this.props.match.params.id}/>}
                  {this.state.authenticated && <BuyingButt proId={this.props.match.params.id} queue={this.addQueue}/>}
                </Grid>
              </CardActions>
            </Card>
        </Grid>
      </div>
    )
  }
}


export default FullProduct;
