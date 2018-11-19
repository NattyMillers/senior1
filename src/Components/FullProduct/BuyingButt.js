import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CartIcon from '@material-ui/icons/ShoppingCart';

import { auth, storage , db } from '../../firebase';

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
      num: '',
      detail: '',
      queue: false,
      capCheck: '',
      takenCheck: '',
      usersId: [],
      token: '',
      authenticated: false,
      soldout: false,
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
    this.checkEqual()
  }

  getData = () => {
    db.ref('products/'+this.props.proId).once('value', snapshot=> {
      this.setState({
        name: snapshot.child('name').val(),
        price: snapshot.child('price').val(),
      })
      // console.log(snapshot.val());
    }).then( res => {
    })
  }



  checkEqual = () => {
    db.ref('products/'+this.props.proId).once('value', snapshot => {
      this.setState({
        capCheck: snapshot.child('cap').val(),
        takenCheck: snapshot.child('taken').val(),
      })
    }).then( (res) => {
      console.log("2");
      if (this.state.capCheck == this.state.takenCheck){
        this.setState({ soldout: true})
      }
      this.getData()
    })
  }

  soldoutButt = () => {
    return (
      <Button size="large" color="primary" style={{borderRadius: 15}}>
        <CartIcon style={{marginRight: 10}}/> Sold Out
      </Button>
    )
  }

  backToFullProduct = () => {
    console.log("does anything happen?");
    this.props.queue(this.props.proId, this.state.name)
    console.log("did it even goM");
  }

  queueButt = () => {
    return (
      <Button onClick={() => this.backToFullProduct()} variant="outlined" size="large" color="primary" style={{borderRadius: 15}}>
        <CartIcon style={{marginRight: 10}}/> Buy this product
      </Button>
    )
  }

  render () {
    return (
      <div >
        {auth.currentUser.uid !== 'TvRI4dswQTVlZGODw1V8ioafNGg2' && this.queueButt()}
        {auth.currentUser.uid !== 'TvRI4dswQTVlZGODw1V8ioafNGg2' && this.state.soldout && this.soldoutButt()}
      </div>
    )
  }
}


export default FullProduct;
