import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';

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
      imagesURL: this.props.dataa,
    }
  }

  componentDidMount = () => {
    console.log("CardItem");
    // console.log(this.state.imagesURL);
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
              {name[1].replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Baht
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
