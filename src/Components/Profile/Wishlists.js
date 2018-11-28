import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FavIcon from '@material-ui/icons/Favorite';

import Logo from '../../Logo.png'
import { storage , db, auth } from '../../firebase';
import wishlists from '../../wishlists.png'

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
    const uid = auth.currentUser.uid
    db.ref('users/' + uid + '/wishlists').once('value').then(snapshot => {
      var a = snapshot.numChildren();
      for (let item in snapshot.val()){
        data.push([item, snapshot.val()[item].name])
        // console.log(snapshot.val()[item].name);
      }
    }).then( res => {
      this.setState({ nameItems: data})
      this.getImage()
    })
  }

  getImage = () => {
    // console.log(this.state.nameItems);
    this.state.nameItems.forEach((name) => {
      // console.log(name);
      var im = storage.ref().child('mainpage').child(name[0] + '.jpg')
      im.getDownloadURL().then((url) => {
        var newArray = this.state.imagesURL.slice();
        newArray.push([name[0], name[1], url]);
        this.setState({ imagesURL: newArray})
      })
    })
  }

  removeWish = (proId) => {
    var uid = 'uid'
    let data = []
    db.ref('users/' + uid + '/wishlists/').child(proId).remove();
    this.setState({ imagesURL: []})
    this.getName()
  }

  showEachImage = () => {
    // console.log(this.state.imagesURL);
    return (
        this.state.imagesURL.map((name) =>
          <Card style={{margin: 10, width: '35%'}}>
            <CardActionArea style={{margin: 'auto', width: '100%'}} onClick={()=>this.props.butto(name[0])}>
              <CardContent>
                <img src={name[2]} width="200" height="220" style={{margin: 'auto'}}/>
                <br/>
                {name[1].replace(/_/g, " ")}
              </CardContent>
            </CardActionArea>
            <Button color="secondary" style={{marginBottom: 3}} onClick={() => this.removeWish(name[0])}>
              <FavIcon style={{marginRight: 10}}/> Remove from Wishlists
            </Button>
          </Card>
      )
    )
  }

    render() {
        return (
            <div style={{textAlign: "center"}}>
              <Paper style={{margin: 20, padding: 20}}>
              <Grid container direction="row" justify="center" alignItems="center" style={{backgroundColor: '#60b0f4'}}>
                <Grid item>
                  <img src={wishlists} width="100%" style={{margin: 'auto'}}/>
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
