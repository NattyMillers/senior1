import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { storage , db, auth } from '../../firebase';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noti: [],
    }
  }

    componentDidMount() {
      this.getNoti()
    }

    getNoti = () => {
      let data = []
      const uid = auth.currentUser.uid
      db.ref('users/' + uid + '/notifications').once('value').then(snapshot => {
        for (let item in snapshot.val()){
          data.push([item, snapshot.val()[item].header, snapshot.val()[item].context]) //[item ID, header, context]
        }
      }).then( res => {
        this.setState({ noti: data})
        console.log(this.state.noti);
      })
    }

    messages = () => {
      return (
        this.state.noti.map((note) =>
          <ExpansionPanel style={{paddingBottom: 20}}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography >{note[1]}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {note[2]}
              </Typography>
            </ExpansionPanelDetails>
            <Button variant="outlined" size="large" color="secondary" style={{borderRadius: 15, marginRight: 15}}> Make a payement</Button>
            <Button variant="outlined" size="large" color="primary" style={{borderRadius: 15}}> Mark as Read</Button>
            <br/>
          </ExpansionPanel>
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
                    NOTIFICATIONS
                  </Grid>
                </Grid>
                <Divider/>
                {this.messages()}
              </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Notifications);
