import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import axios from "./AxiosConfigurations";
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


import payment from '../payment.png';
import { auth, storage , db } from '../firebase';

class PayWithOmise extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      product: this.props.location.state.product,
      amount: this.props.location.state.amount,
      name: this.props.location.state.name,
      capCheck: '',
      takenCheck: '',
      usersId: [],
      imagesURL: '',
      cap: '',
      taken: '',
      address: '',
      city: '',
      zip: '',
      country: '',
    };
  }

  componentDidMount = () => {
    const { OmiseCard }  = window;
    OmiseCard.configure({
        publicKey: 'pkey_test_5dufmc0ceqe4xyt4njf',
        amount: this.state.amount + '00',
        onCreateTokenSuccess: (x) => {
            this.onSubmit(x);
        },
        submitAuto: 'no'
    });
    OmiseCard.configureButton('#checkout-button', {
      frameLabel: 'CROWD Shop Payment', //this.state.productName
      submitLabel: 'PAY NOW ',
      submitFormTarget: '#checkout-form'
        });

    OmiseCard.attach();

    var im = storage.ref().child('mainpage').child(this.state.product + '.jpg')
    im.getDownloadURL().then((url) => {
      this.setState({ imagesURL: url})
    })

    const uid = auth.currentUser.uid
    db.ref('users/' + uid + '/profile/').once('value', snapshot => {
      this.setState({
        address: snapshot.child('address').val(),
        city: snapshot.child('city').val(),
        zip: snapshot.child('zip').val(),
        country: snapshot.child('country').val(),
      })
    })

  }

  // axy = () => {
  //   var payload = {name : "natty"}
  //   var jsonText = JSON.stringify(payload);
  //   var payload1 = JSON.parse(jsonText)
  //   axios.post("http://localhost:5000/massdrop-shopping/us-central1/hellofirebase", payload)
  //   .then((response) => {
  //       console.log(response.data)
  //   })
  //   .catch((error) => {
  //       console.log(error)
  //   })
  // }

  onSubmit = (token) => {
    console.log(token)
    var payload = { token: token, amount: this.state.amount + '00' }
    axios.post("http://localhost:5000/massdrop-shopping/us-central1/pay", payload)
    .then((response) => {
        console.log("Check validate")
        console.log(response)
        if (response.data === "Success"){
            console.log("Success payment");
            this.complicatedStuff()
        }
        else if (response.data === "Fail"){
            console.log("Fail payment");
            alert("Sorry your payment was not successful. Please try again...")
        }
    })
    .catch((error) => {
        alert("Sorry your payment was not successful. Please try again...")
        console.log("wwwwwwwww " + error)
    })
  }

  complicatedStuff = () => {
    db.ref('products/'+this.state.product).once('value', snapshot=> {
      this.setState({
        cap: snapshot.child('cap').val(),
        taken: snapshot.child('taken').val(),
      })
    }).then( res => {
      const uid = auth.currentUser.uid
      //add to users queue
      var postData = { name : this.state.name }
      let ref = db.ref(`users/${uid}/queue/${this.state.product}/`)
      ref.set(postData)
      //increase the number of queue in product
      var postData2 = { taken: this.state.taken + 1}
      let ref2 = db.ref(`products/${this.state.product}`)
      ref2.update(postData2)
      //add uid to products
      var postData3 = { [this.state.taken]: uid}
      let ref3 = db.ref(`products/${this.state.product}/usersId/`)
      ref3.update(postData3)
      this.setState({ queue: true})
      var notDet = { header: "Payment Confirmation...",
                      context: "We have received your payment and will let you know right away when " + this.state.name.replace(/_/g, " ") + " is ready to be ship!",
                      id: this.state.product,
                      read: false}
      let notRef = db.ref(`users/${uid}/notifications/${this.state.product}`)
      notRef.update(notDet)
      this.checkEqual()
    })
  }

  checkEqual = () => {
    db.ref('products/'+this.state.product).once('value', snapshot => {
      this.setState({
        capCheck: snapshot.child('cap').val(),
        takenCheck: snapshot.child('taken').val(),
      })
    }).then( (res) => {
      console.log("2");
      if (this.state.capCheck == this.state.takenCheck){
        this.sendNoti()
      }else{
        this.props.history.push('/thankyou')
      }
    })
  }

  sendNoti = () => {
    console.log("3");
    db.ref('products/'+this.state.product).once('value', snapshot => {
      this.setState({
        usersId : snapshot.child('usersId').val(),
      })
    }).then((res) => {
      this.state.usersId.forEach((usr) => {
        var sendNot = { header: "Your item is ready.",
                        context: "We're happy to tell you that " + this.state.name.replace(/_/g, " ") + " are ready to ship! " + this.state.name.replace(/_/g, " ") + " is expected to be by your door in 3 days. Thank you for shopping with us! :)",
                        id: this.state.product,
                        read: false}
        let refNot = db.ref(`users/${usr}/notifications/${this.state.product}2`)
        refNot.update(sendNot)
      })
      this.props.history.push('/thankyou')
    })
  }

  confirmAddress = () => {
    const uid = auth.currentUser.uid
    var postData2 = { address: this.state.address, city: this.state.city, zip: this.state.zip, country: this.state.country}
    let ref2 = db.ref(`users/${uid}/profile/`)
    ref2.update(postData2)
  }

  handleChange = name => event => {
      this.setState({
          [name]: event.target.value,
      });
  };

  render () {
    return (
      <div>
        <Card style={{width: '50%', margin: 'auto', justifyContent: 'center', paddingBottom: '5%', textAlign: 'center'}}>
        <img src={payment}  resizeMode="contain" width="100%" style={{margin: 'auto'}}/>
        <Card style={{margin: '7%'}}>
          <img src={this.state.imagesURL} resizeMode="contain" width="30%" style={{float: 'left', margin: '2%'}}/>
          <Typography component="h2" variant="title" style={{paddingTop: '7%'}} gutterBottom>Product: {this.state.name.replace(/_/g, " ")}</Typography>
        </Card>
        <Typography component="h2" variant="title" gutterBottom> Total Payment: {this.state.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Baht</Typography>
        <TextField
          id="address"
          label="Address"
          className="classes.textfield"
          value={this.state.address}
          onChange={this.handleChange('address')}
          margin="normal"
          variant="outlined"
          style={{width: 280}}
          type="text"
          required
          />
        <TextField
          id="city"
          label="City"
          className="classes.textfield"
          value={this.state.city}
          onChange={this.handleChange('city')}
          margin="normal"
          variant="outlined"
          style={{width: 280}}
          type="text"
          required
          />
        <TextField
          id="zip"
          label="Zip or Postal Code"
          className="classes.textfield"
          value={this.state.zip}
          onChange={this.handleChange('zip')}
          margin="normal"
          variant="outlined"
          style={{width: 280}}
          type="text"
          required
          />
        <TextField
          id="country"
          label="Country"
          className="classes.textfield"
          value={this.state.country}
          onChange={this.handleChange('country')}
          margin="normal"
          variant="outlined"
          style={{width: 280}}
          type="text"
          required
          />
          <br/>
          <br/>
        <Grid container direction="column" justify="space-evenly" alignItems="center">
          <List>
            <Button variant="outlined" color="primary" onClick={() => this.confirmAddress()} style={{borderRadius: 15, height: '100%', width: '100%'}}> Confirm Address</Button>
            <br/>
            <br/>
            <Button variant="outlined" color="secondary" style={{borderRadius: 15}}>
              <form
                onSubmit = {(e) => this.onSubmit(e)}
                id="checkout-form"
                name="checkoutForm"
                method="POST">
                <ListItem
                  primaryText="Pay The Item"
                  type="submit"
                  value="Pay The Item."
                  id="checkout-button" />
              </form>
            </Button>
            <br/>
            <br/>
            <Button variant="outlined" color="primary" onClick={() => this.props.history.push('/')} style={{borderRadius: 15, height: '100%', width: '100%'}}> Cancel</Button>
          </List>
        </Grid>
        </Card>
      </div>
    )
  }
}

export default PayWithOmise;
