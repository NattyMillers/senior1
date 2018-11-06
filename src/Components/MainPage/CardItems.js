import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';

import { storage , db } from '../../firebase';

const Cardstyles = {
    width: window.innerWidth/5,
    height: 350,
    display: 'flex',
    marginBottom: window.innerWidth*0.02,
    borderRadius: 0,
  };

const Imagestyles = {
  objectFit: 'contain',
  width: window.innerWidth/6,
}

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
    console.log("start getImage");
    this.state.namePrice.forEach((name) => {
      var im = storage.ref().child('mainpage').child(name[0] + '.jpg')
      im.getDownloadURL().then((url) => {
        var newArray = this.state.imagesURL.slice();
        newArray.push([name[0], name[1], name[2], url]);
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
              <img src={name[3]} resizeMode="contain" style={Imagestyles}/>
              {name[2].replace(/_/g, " ")}
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
            <Grid container direction="row" justify="space-between" alignItems="center">
              {this.showEachImage()}
              </Grid>
          </div>
        );
    }
}

export default CardItem;
