import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';

import Logo from '../../Logo.png'
import { storage , db } from '../../firebase';

const styles = theme => ({
  textfield: {
    margin: 20,
  },
})

const Cardstyles = {
    width: window.innerWidth/4.6,
    height: 400,
    display: 'flex',
    margin: window.innerWidth*0.03,
    borderRadius: 0,
    boxShadow: 'none',
  };

class Wishlists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nameItems: [],
      imagesURL: [],
    }
  }

  componentDidMount() {
    this.getName()
  }

  sets = (allState) => {
    this.setState({ nameItems: allState })
  }

  getName = () => {
    console.log("start getName");
    let data = []
    var uid = 'uid'
    db.ref('users/' + uid + '/wishlists/').once('value').then(snapshot => {
      var a = snapshot.numChildren();
      snapshot.val().forEach((doc) =>{
        data.push([doc.productID, doc.productName])
      })
    }).then( res => {
      this.setState({ nameItems: data})
      this.getImage()
    })
  }

  getImage = () => {
    console.log(this.state.nameItems);
    this.state.nameItems.forEach((name) => {
      console.log(name);
      var im = storage.ref().child('mainpage').child(name[0] + '.jpg')
      im.getDownloadURL().then((url) => {
        var newArray = this.state.imagesURL.slice();
        newArray.push([name[0], name[1], url]);
        this.setState({ imagesURL: newArray})
      })
    })
  }

  showEachImage = () => {
    console.log(this.state.imagesURL);
    return (
        this.state.imagesURL.map((name) =>
          <Card style={{margin: 10}}>
            <CardActionArea onClick={()=>this.props.butto(name[0])}>
              <CardContent>
                <img src={name[2]} width="200" height="220" style={{margin: 5}}/>
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
            <div style={{textAlign: "center"}}>
              <Paper style={{margin: 20, padding: 20}}>
                <Grid container spacing={24} style={{marginBottom: 10}}>
                  <Grid item xs={5}>
                  </Grid>
                  <Grid item>
                    WISHLISTS
                  </Grid>
                </Grid>
                <Divider/>
                <Grid container direction="row" justify="space-evenly" alignItems="stretch">
                  {this.showEachImage()}
                </Grid>
              </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Wishlists);
