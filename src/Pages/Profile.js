import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import PersonIcon from '@material-ui/icons/Person';
import FavIcon from '@material-ui/icons/Favorite';
import NotiIcon from '@material-ui/icons/Notifications';

import ProfileRight from '../Components/Profile/ProfileRight';
import Wishlists from '../Components/Profile/Wishlists';
import Queue from '../Components/Profile/Queue';
import Notifications from '../Components/Profile/Notifications';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});
class Profile extends Component {

  state = {
      selectedIndex: this.props.location.state.page,
    };

    handleListItemClick = (event, index) => {
      this.setState({ selectedIndex: index });
    };

    handleClick = (val) => {
      this.props.history.push('/fullproduct/' + val)
    }

    whichPage = () => {
      if(this.state.selectedIndex === 0){
        return (
          <div>
            <ProfileRight/>
          </div>
        )
      }
      else if (this.state.selectedIndex === 1){
        return (
          <div>
            <Wishlists butto={this.handleClick}/>
          </div>
        )
      }
      else if (this.state.selectedIndex === 2){
        return (
          <div>
            <Notifications/>
          </div>
        )
      }
      else if (this.state.selectedIndex === 3){
        return (
          <div>
            <Queue/>
          </div>
        )
      }
    }

  render () {
    const { classes } = this.props;
    return (
      <div style={{margin: window.innerWidth*0.03}}>
        <Grid container spacing={24}>
          <Grid item xs={4}>

          <div className={classes.root}>
            <List component="nav">
              <ListItem
                button
                selected={this.state.selectedIndex === 0}
                onClick={event => this.handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>

              <ListItem
                button
                selected={this.state.selectedIndex === 1}
                onClick={event => this.handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <FavIcon />
                </ListItemIcon>
                <ListItemText primary="Wishlists" />
              </ListItem>

              <ListItem
                button
                selected={this.state.selectedIndex === 2}
                onClick={event => this.handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <NotiIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem
                button
                selected={this.state.selectedIndex === 3}
                onClick={event => this.handleListItemClick(event, 3)}
              >
                <ListItemIcon>
                  <TagFacesIcon />
                </ListItemIcon>
                <ListItemText primary="Queue" />
              </ListItem>
            </List>

            <Divider />

            <List component="nav">
              <ListItem
                button
                selected={this.state.selectedIndex === 4}
                onClick={event => this.handleListItemClick(event, 4)}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </div>

          </Grid>

          <Grid item xs={8}>
            {this.whichPage()}
          </Grid>

        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Profile);
