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

import noti from '../../notifications.png'

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
      imagesURL: '',
      notii: [],
    }
  }

    componentDidMount() {
      this.getNoti()
    }

    getNoti = () => {
      let data = []
      let read = 0
      // this.setState({ noti: [], notii: []})
      const uid = auth.currentUser.uid
      db.ref('users/' + uid + '/notifications').once('value').then(snapshot => {
        for (let item in snapshot.val()){
          var im = storage.ref().child('mainpage').child(snapshot.val()[item].id + '.jpg')
          im.getDownloadURL().then((url) => {
            data.push([item, snapshot.val()[item].header, snapshot.val()[item].context, snapshot.val()[item].read, url, snapshot.val()[item].id])
          })
          // data.push([item, snapshot.val()[item].header, snapshot.val()[item].context, snapshot.val()[item].read, url, snapshot.val()[item].id]) //[item ID, header, context, read status, id]
        }
      }).then( res => {
        this.setState({ noti: data})
        // this.getImages()
      })
    }

    getImages = () => {
      this.state.noti.forEach((each) => {
        var im = storage.ref().child('mainpage').child(each[4] + '.jpg')
        im.getDownloadURL().then((url) => {
          var newArray = this.state.notii.slice();
          newArray.push([each[0], each[1], each[2], each[3], url]);
          this.setState({ notii: newArray})
        })
      })
    }

    addRead = (note) => {
      const uid = auth.currentUser.uid
      var updateThis = { read: true}
      let ref2 = db.ref(`users/${uid}/notifications/${note[0]}/`)
      ref2.update(updateThis).then( res => {
        this.props.buttin()
        this.getNoti()
      })
      // this.setState({ read: this.state.read - 1})
    }

    messages = (note) => {
      const isRead = note[3]
      let notifi;
      if (!note[3]) {
        notifi =
        <ExpansionPanel style={{paddingBottom: 20, backgroundColor: '#EEEEEE'}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={() => this.addRead(note)} />}>
            <Typography >{note[1]}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <img src={note[4]} resizeMode="contain" width="30%" style={{float: 'left', margin: '2%', maxHeight: '120px'}}/>
            <Typography>
              {note[2]}
            </Typography>
          </ExpansionPanelDetails>
          <br/>
        </ExpansionPanel>
      } else {
        notifi =
        <ExpansionPanel style={{paddingBottom: 20}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography >{note[1]}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <img src={note[4]} resizeMode="contain" width="30%" style={{float: 'left', margin: '2%', maxHeight: '120px'}}/>
            <Typography>
              {note[2]}
            </Typography>
          </ExpansionPanelDetails>
          <br/>
        </ExpansionPanel>
      }
      return (
        <div>
          {notifi}
        </div>
      );
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
              <Paper style={{margin: 20, padding: 20}}>
                <Grid container direction="row" justify="center" alignItems="center" style={{backgroundColor: '#00185a'}}>
                  <Grid item>
                    <img src={noti} width="100%" style={{margin: 'auto'}}/>
                  </Grid>
                </Grid>
                <Divider/>
                {this.state.noti.map((note) => this.messages(note))}
              </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Notifications);
