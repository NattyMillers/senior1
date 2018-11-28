import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

import CardItem from '../Components/MainPage/CardItems'
import SortBy from '../Components/MainPage/SortBy'
import Banner from '../Banner.jpg'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { storage , db } from '../firebase';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imagesURL: [],
      namePrice: [],
      loading: true,
      back: true,
    }
  }

  componentDidMount() {
    this.getName()
  }

  getName = () => {
    this.setState({ loading: true, back: true})
    console.log("start getName");
    let data = []
    db.ref('products/').orderByKey().limitToFirst(12).once('value', snapshot=> {
      snapshot.forEach((doc) => {
        data.push([doc.key, doc.val().price, doc.val().name]); //the second one should be the price doc.child('price')

      })
    }).then( res => {
      this.setState({
        namePrice: data
      })
      this.getImage()
      console.log("done getName");
    })
  }

  getImage = () => {
    this.setState({imagesURL: []})
    console.log("start getImage");
    console.log(this.state.namePrice);
    this.state.namePrice.forEach((name) => {
      var im = storage.ref().child('mainpage').child(name[0] + '.jpg')
      console.log(im);
      im.getDownloadURL().then((url) => {
        console.log(url);
        var newArray = this.state.imagesURL.slice();
        newArray.push([name[0], name[1], name[2], url]);
        this.setState({ imagesURL: newArray})
      }).then (res => {
        if (this.state.namePrice.length === this.state.imagesURL.length){
          this.setState({ loading: false})
        }
      })
    })
  }

  handleClick = (val) => {
    this.props.history.push('/fullproduct/' + val)
  }

  loadmore = () => {
    this.setState({ namePrice: [], loading: true, back: false})
    let data = []
    db.ref('products/').orderByKey().limitToLast(4).once('value', snapshot=> {
      snapshot.forEach((doc) => {
        data.push([doc.key, doc.val().price, doc.val().name]); //the second one should be the price doc.child('price')

      })
    }).then( res => {
      this.setState({
        namePrice: data
      })
      this.getImage()
      console.log("done getName");
    })
  }

    render() {
      const content = this.state.loading ? (
            <div align="center">
                <CircularProgress size={80} thickness={5} />
            </div>
        ) : (
            <div>
              <CardItem butto={this.handleClick} dataa={this.state.imagesURL}/>
              {this.state.back? <Button variant="outlined" size="large" color="primary" style={{marginBottom: 20}} onClick={() => this.loadmore()}> Next Page </Button> :
              <Button variant="outlined" size="large" color="primary" style={{marginBottom: 20}} onClick={() => this.getName()}> Back </Button>}
            </div>
        );
        return (
            <div style={{textAlign: "center", backgroundColor: '#EEEEEE'}}>
              <Paper style={{ padding: 20, boxShadow: 'none', backgroundColor: '#EEEEEE'}}>
                <img src={Banner} resizeMode="contain" style={{width: '90%'}}/>
              </Paper>
              { content }
            </div>
        );
    }
}

export default Main;
