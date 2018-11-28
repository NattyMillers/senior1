import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';

import { db } from '../firebase';

const emails = getItem();
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

function getItem() {
  let data = []
  db.ref('products/').once('value', snapshot=> {
    snapshot.forEach((doc) => {
      if (doc.val().cap == doc.val().taken){
        data.push(doc.key); //[id, name, cap, taken]
      }
    })
  }).then( res => {
    return data
  })
  return data
}

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Select Item</DialogTitle>
        <div>
          <List>
            {emails.map(email => (
              <ListItem button onClick={() => this.handleListItemClick(email)} key={email}>
                <ListItemText primary={email.replace(/_/g, " ")} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class Delivery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullItem: [],
      custName: [],
      open: false,
      selectedValue: '',
    }
  }

  componentDidMount = () => {
  }

  getCustList = (proId) => {
    db.ref('products/'+ proId + '/usersId').once('value', snapshot=> {
      this.setState({ custName: snapshot.val()})
    })
    console.log(this.state.custName);
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    let data = []
    if (value !== '') {
      db.ref('products/'+ value + '/usersId/').once('value', snapshot=> {
        snapshot.val().forEach((uid) => {
          db.ref('users/'+ uid + '/profile/').once('value', snap=> {
            data.push([uid, snap.val().name])
          })
        })
        // this.setState({custName: snapshot.val(), selectedValue: value, open: false })
      }).then( res => {
        this.setState({custName: data, selectedValue: value, open: false })
        console.log(this.state.custName);
      })
    }else{
      this.setState({open: false })
    }

  };

  showCustName = () => {
    // console.log(this.state.custName.length);
    return (
      this.state.custName.map((name) =>
        <Card style={{padding: 10}}>
          <Typography style={{float: 'left'}}>{name[1]}</Typography>
          <TextField
          id="newPass"
          label="Tracking No."
          className="classes.textfield"
          margin="normal"
          variant="outlined"
          style={{width: '30%', float: 'right'}}>
          </TextField>
        </Card>
      )
    )
  }


    render() {
        return (
          <div>
            <Card style={{width: '50%', margin: 'auto', padding: '5%'}}>
            <Button variant="outlined" onClick={this.handleClickOpen}>Please choose the product</Button>
            <SimpleDialogWrapped
              selectedValue={this.state.selectedValue}
              open={this.state.open}
              onClose={this.handleClose}
            />
            <br/>
            <Typography variant="subtitle1">Selected: {this.state.selectedValue}</Typography>
            <List>
            <Card style={{backgroundColor: 'black', color: 'white', padding: 10}}>
              <Typography style={{float: 'left', color: 'white'}}>name:</Typography>
              <Typography style={{float: 'right', color: 'white'}}>Tracking No:</Typography>
            </Card>
            {this.state.custName.length > 0 && this.showCustName()}
            </List>
            <br />
            <Button variant="contained" color="primary" style={{float: 'right', width: '25%'}}> Submit </Button>
            </Card>
          </div>

        );
    }
}

export default Delivery;
