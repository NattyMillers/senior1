import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';

import { storage , db } from '../../firebase';

const Cardstyles = {
    width: window.innerWidth/4.6,
    height: 400,
    display: 'flex',
    margin: window.innerWidth*0.03,
    borderRadius: 0,
    boxShadow: 'none',
  };

class CardItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imagesName: [],
      imagesURL: [],
    }
    // this.attemptLogin = this.attemptLogin.bind(this);
    // this.attemptSignUp = this.attemptSignUp.bind(this);
    // this.imagesURL = this.imagesURL.bind(this);

  }

  componentDidMount() {
    this.getName()
  }

  getName = () => {
    console.log("start getName");
    let data = []
    db.ref('images/').once('value', snapshot=> {
      snapshot.forEach((doc) => {
        data.push(doc.key);
        console.log("done here = " + doc.key);
      })
    }).then( res => {
      this.setState({
        imagesName: data
      })
      this.getImage()
      console.log("done getName");
    })
  }

  getImage = () => {
    console.log("start getImage");
    this.state.imagesName.forEach((name) => {
      var im = storage.ref().child('mainpage').child(name + '.jpg')
      im.getDownloadURL().then((url) => {
        var newArray = this.state.imagesURL.slice();
        newArray.push(url);
        this.setState({ imagesURL: newArray})
      })
    })
  }

  showImage = () => {
    console.log("yaysis");
    console.log(this.state.imagesURL);
    return (
        this.state.imagesURL.map((url) =>
        <Card style={Cardstyles}>
          <CardActionArea>
            <CardContent>
              <img src={url} width="250" height="270" style={{margin: 5}}/>
            </CardContent>
          </CardActionArea>
        </Card>
      )
    )
  }


    render() {
        return (
          <div style={{margin: window.innerWidth*0.03}}>
            <Grid container spacing={24}>
              {this.showImage()}
              </Grid>
          </div>
        );
    }
}

export default CardItem;
