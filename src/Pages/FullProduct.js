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

import { auth, storage , db } from '../firebase';

const Imagestyles = {
  objectFit: 'contain',
}

const CardLeft = {
    width: window.innerWidth/2.3,
    height: 530,
    marginTop: 50,
    paddingLeft: 50,
    paddingRight: 50,
    // marginLeft: 50,
  };

const CardRight = {
    width: window.innerWidth/2.3,
    height: 530,
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
      like: true,
      picNames: [],
      imagesURL: [],
      num: '',
      detail: '',
      queue: false,
      capCheck: '',
      takenCheck: '',
      usersId: [],
    };
  }

  componentWillMount() {
    var uid = auth.currentUser.uid
    let data = ''
    let data2 = ''
    var proId = this.props.match.params.id
    db.ref('users/' + uid + '/wishlists/').once('value').then(function(snapshot) {
      if (snapshot.hasChild(proId)){
        console.log('had liked');
        data = false;
      }else{
        console.log('not like');
        data = true;
      }
    }).then( (res) => {
      this.setState({
        like: data
      })
    })
    db.ref('users/' + uid + '/queue/').once('value').then(function(snapshot) {
      if (snapshot.hasChild(proId)){
        console.log('had queued');
        data2 = true;
      }else{
        console.log('not queue');
        data2 = false;
      }
    }).then( (res) => {
      this.setState({
        queue: data2
      })
    })
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

  addWish = (proId, proName) => { //check if it's already liked then unlike and remove from database
      let data = ''
      console.log(auth.currentUser !== null);
      if (auth.currentUser !== null){
        const uid = auth.currentUser.uid
        db.ref('users/' + uid + '/wishlists/').once('value').then(function(snapshot) {
          if (snapshot.hasChild(proId)){
            data = true;
            console.log('remove like');
            // this.setState({like : false})
            db.ref('users/' + uid + '/wishlists/').child(proId).remove();
          }else{
            data = false;
            console.log('add like');
            // this.setState({like : true})
            db.ref('users/' + uid + '/wishlists/' + proId).set({name: proName})
          }
        }).then( (res) => {
          this.setState({
            like: data
          })
        })
      }
      else{
        alert("Please Login")
      }
  }

  addQueue = (proId, proName) => { //check if it's already queued then unqueue and remove from database
      let dataQ = ''
      console.log(auth.currentUser !== null);
      if (auth.currentUser !== null){
        const uid = auth.currentUser.uid
        var postData = {
          name : this.state.name,
        }
        //add to users queue
        let ref = db.ref(`users/${uid}/queue/${proId}/`)
        ref.set(postData)
        //increase the number of queue in product
        var postData2 = { taken: this.state.taken + 1}
        let ref2 = db.ref(`products/${proId}`)
        ref2.update(postData2)
        //add uid to products
        var postData3 = { [this.state.taken]: uid}
        let ref3 = db.ref(`products/${proId}/usersId/`)
        ref3.update(postData3)
        this.setState({ queue: true})
        this.checkEqual()
        console.log("1");
      }
      else{
        alert("Please Login")
      }
  }

  checkEqual = () => {
    db.ref('products/'+this.props.match.params.id).once('value', snapshot => {
      this.setState({
        capCheck: snapshot.child('cap').val(),
        takenCheck: snapshot.child('taken').val(),
      })
    }).then( (res) => {
      console.log("2");
      if (this.state.capCheck == this.state.takenCheck){
        this.sendNoti()
      }
    })
  }

  sendNoti = () => {
    console.log("3");
    db.ref('products/'+this.props.match.params.id).once('value', snapshot => {
      this.setState({
        usersId : snapshot.child('usersId').val(),
      })
    }).then((res) => {
      this.state.usersId.forEach((usr) => {
        var sendNot = { header: "Your item is ready.",
                        context: "Your item is ready to be shipped. Please make a payment within 3 days or else the product will be automatically cancel by the end of midnight on the third day."}
        let refNot = db.ref(`users/${usr}/notifications/${this.props.match.params.id}`)
        refNot.update(sendNot)
      })
      console.log(this.state.usersId);
    })
  }

  removeQueue = (proId, proName) => {
    const uid = auth.currentUser.uid
    db.ref('users/' + uid + '/queue/').child(proId).remove();
    var updateThis = { taken: this.state.taken - 1}
    let ref2 = db.ref(`products/${proId}/`)
    ref2.update(updateThis)
    this.setState({ queue: false})
  }

  queueButt = () => {
    return (
      <Button onClick={() => this.addQueue(this.props.match.params.id, this.state.name)} variant="outlined" size="large" color="primary" style={{borderRadius: 15}}>
        <CartIcon style={{marginRight: 10}}/> Add to Queue
      </Button>
    )
  }

  unqueueButt = () => {
    return (
      <Button onClick={() => this.removeQueue(this.props.match.params.id, this.state.name)} variant="contained" size="large" color="primary" style={{borderRadius: 15}}>
        <CartIcon style={{marginRight: 10}}/> Remove from Queue
      </Button>
    )
  }

  likedButt = () => {
    return (
      <Button variant="outlined" color="secondary" component="span" style={{borderRadius: 15}} onClick={() => this.addWish(this.props.match.params.id, this.state.name)}>
        <FavIcon style={{marginRight: 10}}/> Add to Wishlists
      </Button>
    )
  }

  unlikedButt = () => {
    return (
      <Button variant="contained" color="secondary" component="span" style={{borderRadius: 15}} onClick={() => this.addWish(this.props.match.params.id, this.state.name)}>
        <FavIcon style={{marginRight: 10}}/> Remove from Wishlists
      </Button>
    )
  }

  carouse = () => {
    return (
      this.state.imagesURL.map((item) =>
        <img src={item} style={Imagestyles} resizeMode="contain" style={{marginRight: 'auto', marginLeft: 'auto', marginTop: 30, display: 'block'}}/>
      )
    )
  }

  render () {
    // console.log(this.props.match.params.id);
    // console.log(this.state.name);
    return (
      <div style={{backgroundColor: '#EEEEEE', sizeBackground: '100bh'}}>
        <Grid container direction="row" justify="space-evenly" alignItems="center">
            <Carousel style={CardLeft}>
              {this.carouse()}
            </Carousel>
            <Card style={CardRight}>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <CardContent>
                  <Typography variant="h4" >
                    {this.state.name.replace(/_/g, " ")}
                  </Typography>
                  <br/>
                  <Typography variant="h4" gutterBottom>
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
                  {this.state.like? this.likedButt() : this.unlikedButt() }
                  {this.state.queue? this.unqueueButt() : this.queueButt() }
                </Grid>
              </CardActions>
            </Card>
        </Grid>
      </div>
    )
  }
}


export default FullProduct;
