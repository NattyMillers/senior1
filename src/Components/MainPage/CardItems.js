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
      namePrice: []
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
    db.ref('products/').once('value', snapshot=> {
      snapshot.forEach((doc) => {
        data.push([doc.key, 0]); //the second one should be the price doc.child('price')

      })
    }).then( res => {
      console.log("done here = " + data[0]);
      this.setState({
        namePrice: data
      })
      this.getImage()
      console.log("done getName");
    })
  }

  getImage = () => {
    console.log("start getImage");
    this.state.namePrice.forEach((name) => {
      var im = storage.ref().child('mainpage').child(name[0] + '.jpg')
      im.getDownloadURL().then((url) => {
        var newArray = this.state.imagesURL.slice();
        newArray.push([name[0], name[1], url]);
        this.setState({ imagesURL: newArray})
      })
    })
  }

  showEachImage = () => {
    return (
        this.state.imagesURL.map((name) =>
        <Card style={Cardstyles}>
          <CardActionArea onClick={()=>this.props.butto(name[0])}>
            <CardContent>
              <img src={name[2]} width="250" height="270" style={{margin: 5}}/>
              {name[0]}
              <br/>
              {name[1]}
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
              {this.showEachImage()}
              </Grid>
          </div>
        );
    }
}

export default CardItem;
