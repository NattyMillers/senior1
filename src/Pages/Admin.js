import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Moment from 'moment';

import { storage , db } from '../firebase';

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      thumbnail: '',
      selectedFile1 : '',
      selectedFile2 : '',
      selectedFile3 : '',
      selectedFile4 : '',
      selectedFile5 : '',
      name: '',
      price: '',
      cap: '',
    }
  }

  thumbnailHandler = (event) => {
    this.setState({
      thumbnail : event.target.files[0]
    })
  }

  selectedfileHandler1 = (event) => {
    this.setState({
      selectedFile1 : event.target.files[0]
    })
  }

  selectedfileHandler2 = (event) => {
    this.setState({
      selectedFile2 : event.target.files[0]
    })
  }

  selectedfileHandler3 = (event) => {
    this.setState({
      selectedFile3 : event.target.files[0]
    })
  }

  selectedfileHandler4 = (event) => {
    this.setState({
      selectedFile4 : event.target.files[0]
    })
  }

  selectedfileHandler5 = (event) => {
    this.setState({
      selectedFile5 : event.target.files[0]
    })
  }

  nameHandler = (event) => {
    this.setState({ name : event.target.value})
  }

  priceHandler = (event) => {
    this.setState({ price : event.target.value})
  }

  capHandler = (event) => {
    this.setState({ cap : event.target.value})
  }

  fileUploadHandler = () => {
    const date = Moment().format('MMMMDoYYYYhmmss').toLowerCase();
    let productID = this.state.name + date
    if (this.state.name !== '' && this.state.price !== '' && this.state.cap !== '' && this.state.thumbnail !== ''){

      if (this.state.selectedFile1 !== ''){
        storage.ref(productID + '/' + this.state.name + '1').put(this.state.selectedFile1)
        .then(res =>{
          console.log(res)
        })
      }
      if (this.state.selectedFile2 !== ''){
        storage.ref(productID + '/' + this.state.name + '2').put(this.state.selectedFile1)
        .then(res =>{
          console.log(res)
        })
      }
      if (this.state.selectedFile3 !== ''){
        storage.ref(productID + '/' + this.state.name + '3').put(this.state.selectedFile1)
        .then(res =>{
          console.log(res)
        })
      }
      if (this.state.selectedFile4 !== ''){
        storage.ref(productID + '/' + this.state.name + '4').put(this.state.selectedFile1)
        .then(res =>{
          console.log(res)
        })
      }
      if (this.state.selectedFile5 !== ''){
        storage.ref(productID + '/' + this.state.name + '5').put(this.state.selectedFile1)
        .then(res =>{
          console.log(res)
        })
      }
      storage.ref('mainpage/' + productID+'.jpg').put(this.state.thumbnail).then(res => {
        console.log(res)
      })
      var postData = {
        addDate : date,
        cap: this.state.cap,
        name: this.state.name,
        price: this.state.price,
        taken: 0
      }
      console.log({postData})
      let ref = db.ref(`products/${productID}/`)
      ref.set(postData)
    }
    else {
      alert("Please check if name, price, capacity and thumbnail are filled out")
    }

    // console.log(this.state.selectedFile.name);
    // storage.ref('mainpage/'+this.state.selectedFile.name).put(this.state.selectedFile)
    // .then(res =>{
    //   console.log(res)
    // })
  }


    render() {
        return (
            <div style={{textAlign: "center", backgroundColor: "#EEEEEE"}}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Paper style={{width: '50%', marginTop: '2%', padding: '5%', marginBottom: 50}}>
                <h1 style={{color: '#1c4587'}}> Add New Products</h1>
                <Grid container direction="row" justify="space-evenly" alignItems="center" >
                  <TextField onChange={this.nameHandler} label="Product Name" margin="normal" variant="outlined" required/>
                  <TextField onChange={this.priceHandler} label="Price" type="number" margin="normal" variant="outlined" required/>
                  <TextField onChange={this.capHandler} label="Capacity" type="number" margin="normal" variant="outlined" required/>
                  </Grid>
                  <br/>
                  <br/>
                  <h4>Thumbnail: </h4>
                  <input type="file" onChange={this.thumbnailHandler}/>
                  <div>
                    <br/>
                    <br/>
                    <h4>Product pictures: </h4>
                    <input type="file" onChange={this.selectedfileHandler1}/>
                    <br/>
                    <br/>
                    <input type="file" onChange={this.selectedfileHandler2}/>
                    <br/>
                    <br/>
                    <input type="file" onChange={this.selectedfileHandler3}/>
                    <br/>
                    <br/>
                    <input type="file" onChange={this.selectedfileHandler4}/>
                    <br/>
                    <br/>
                    <input type="file" onChange={this.selectedfileHandler5}/>
                  </div>
                  <Button onClick={() => this.fileUploadHandler()}
                  style={{color: 'white',
                          fontSize: 18,
                          backgroundColor:'#1c4587',
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingLeft: '40%',
                          paddingRight: '40%',
                          marginTop: 30,
                          borderRadius: 8}}>
                   Upload
                  </Button>
                </Paper>
              </Grid>
             </div>
        );
    }
}

export default Admin;
