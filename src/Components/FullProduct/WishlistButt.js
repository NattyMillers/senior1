import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavIcon from '@material-ui/icons/Favorite';

import { auth, storage , db } from '../../firebase';

class FullProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      like: true,
    };
  }

  componentWillMount() {
    var uid = auth.currentUser.uid
    let data = ''
    let data2 = ''
    var proId = this.props.proId
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
  }

  componentDidMount() {
    console.log(" in FullProduct");
    this.getName()
  }

  getName = () => {
    db.ref('products/'+this.props.proId).once('value', snapshot=> {
      this.setState({
        name: snapshot.child('name').val(),
      })
    }).then( res => {
    })
  }

  addWish = (proId, proName) => { //check if it's already liked then unlike and remove from database
      let data = ''
      console.log(auth.currentUser !== null);
      if (auth.currentUser.uid !== 'TvRI4dswQTVlZGODw1V8ioafNGg2'){
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
        console.log("login as admin");
        // alert("Please Login")
      }
  }

  likedButt = () => {
    return (
      <Button variant="outlined" color="secondary" component="span" style={{borderRadius: 15}} onClick={() => this.addWish(this.props.proId, this.state.name)}>
        <FavIcon style={{marginRight: 10}}/> Add to Wishlists
      </Button>
    )
  }

  unlikedButt = () => {
    return (
      <Button variant="contained" color="secondary" component="span" style={{borderRadius: 15}} onClick={() => this.addWish(this.props.proId, this.state.name)}>
        <FavIcon style={{marginRight: 10}}/> Remove from Wishlists
      </Button>
    )
  }

  render () {
    return (
      <div >
          {this.state.like? this.likedButt() : this.unlikedButt() }
      </div>
    )
  }
}


export default FullProduct;
