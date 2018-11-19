import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

import { auth, storage , db } from '../firebase';
import thankyou from '../thankyou.png'

class Thankyou extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
    };
  }

  componentDidMount() {
    console.log(" in FullProduct");
  }

  render () {
    return (
      <div >
        <Card style={{width: '80%', margin: 'auto', justifyContent: 'center', textAlign: 'center'}}>
          <img src={thankyou} resizeMode="contain" width="80%" style={{margin: '2%'}}/>
          <br/>
          <Button style={{marginBottom: '5%'}} variant="outlined" size="large" color="primary" onClick={() => this.props.history.push('/')}>Continue to the website</Button>
        </Card>
      </div>
    )
  }
}


export default Thankyou;
