import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { storage , db, auth } from '../../firebase';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import orders from '../../orders.png'

const styles = theme => ({
  textfield: {
    margin: 20,
  }
})

class Queue extends Component {

    state = {
      nameItems: [],
      nameCaps: [],
    };

    componentDidMount() {
      this.getName()
    }

    getName = () => {
      console.log("start getName");
      let data = []
      const uid = auth.currentUser.uid
      db.ref('users/' + uid + '/queue').once('value').then(snapshot => {
        var a = snapshot.numChildren();
        for (let item in snapshot.val()){
          data.push([item, snapshot.val()[item].name]) //[item ID, item name]
        }
      }).then( res => {
        this.setState({ nameItems: data})
        this.getCap()
      })
    }

    getCap = () => {
      console.log(this.state.nameItems);
      this.state.nameItems.forEach((name) => {
        var anotherdata = this.state.nameCaps;
        db.ref('products/' + name[0]).once('value').then( snap => {
          anotherdata.push([ name[0], name[1], snap.val().cap, snap.val().taken]) //[item ID, item name, capacity, taken]
        }).then(res => {
          this.setState({ nameCaps: anotherdata})
        })
      })
    }

    removeQueue = (product) => {
      const uid = auth.currentUser.uid
      db.ref('users/' + uid + '/queue/').child(product[0]).remove();
      var updateThis = { taken: product[3] - 1}
      let ref2 = db.ref(`products/${product[0]}`)
      ref2.update(updateThis)
      this.setState({
        nameItems: [],
        nameCaps: [],
      })
      this.getName()
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
              <Paper style={{margin: 20, padding: 20}}>
                <Grid container direction="row" justify="center" alignItems="center" style={{backgroundColor: '#f15722'}}>
                  <Grid item>
                    <img src={orders} width="100%" style={{margin: 'auto'}}/>
                  </Grid>
                </Grid>
                <Divider/>
                <List>
                {this.state.nameCaps.map((note) =>
                  <ListItem>
                    <ListItemText primary={note[1].replace(/_/g, " ")}/>
                    <ListItemText primary={note[3] +'/' +note[2]}/>
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete" onClick={() => this.removeQueue(note)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
                </List>
              </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Queue);
