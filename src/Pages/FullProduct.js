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

import { storage , db } from '../firebase';

const CardLeft = {
    width: window.innerWidth/2.3,
    height: 530,
    marginTop: 50,
    // marginLeft: 50,
  };

const CardRight = {
    width: window.innerWidth/2.3,
    height: 530,
    marginTop: 50,
    // marginRight: 50,
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
      like: false,
    };
  }

  componentDidMount() {
    console.log(" in FullProduct");
    this.getData()
    this.getURL()
  }

  getData = () => {
    let data = []
    db.ref('products/'+this.props.match.params.id).once('value', snapshot=> {
      this.setState({
        addDate: snapshot.child('addDate').val(),
        cap: snapshot.child('cap').val(),
        name: snapshot.child('name').val(),
        price: snapshot.child('price').val(),
        taken: snapshot.child('taken').val(),
      })
      // console.log(snapshot.val());
    })
  }

  getURL = () => {
    var im = storage.ref().child('mainpage').child(this.props.match.params.id + '.jpg')
    im.getDownloadURL().then((url) => {
      this.setState({ picURL: url})
    })
  }

//can't use numchildren 
  addWish = (proId, proName) => { //check if it's already liked then unlike and remove from database
    // console.log(proName);
    if (!this.state.like){
      this.setState({like: true})
      var uid = 'uid'
      db.ref('users/' + uid + '/wishlists/').once('value').then(function(snapshot) {
        var a = snapshot.numChildren();
        db.ref('users/' + uid + '/wishlists/' + a).set({
          productID: proId,
          productName: proName
        })
      })
    }else{
      // db.ref('users/' + uid + '/wishlists/').child(note.id).remove();
      this.setState({like: false})
    }
  }

  render () {
    // console.log(this.props.match.params.id);
    console.log(this.state.name);
    return (
      <div>
        <Grid container direction="row" justify="space-evenly" alignItems="center">
            <Card style={CardLeft}>
              <img src={this.state.picURL} width="400" height="450" style={{marginRight: 'auto', marginLeft: 'auto', marginTop: 30, display: 'block'}}/>
            </Card>
            <Card style={CardRight}>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <CardContent>
                  <Typography variant="display2" >
                    {this.state.name}
                  </Typography>
                  <br/>
                  <Typography variant="display1" gutterBottom>
                    {this.state.price} THB
                  </Typography>
                  <Divider style={{width: window.innerWidth/2.5}}/>
                  <br/>
                  Taken: {this.state.taken}
                  <br/>
                  Capacity: {this.state.cap}
                  <br/>
                  Add Date: {this.state.addDate}
                </CardContent>
              </Grid>
              <CardActions>
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                  <Divider style={{width: window.innerWidth/2.5}}/>
                  <br/>
                  <br/>
                  <Button variant="outlined" color="secondary" component="span" style={{borderRadius: 15}} onClick={() => this.addWish(this.props.match.params.id, this.state.name)}>
                    <FavIcon style={{marginRight: 10}}/> Add to Wishlists
                  </Button>
                  <Button variant="outlined" size="large" color="primary" style={{borderRadius: 15}}>
                    <CartIcon style={{marginRight: 10}}/> Add to Queue
                  </Button>
                </Grid>
              </CardActions>
            </Card>
        </Grid>
      </div>
    )
  }
}


export default FullProduct;
