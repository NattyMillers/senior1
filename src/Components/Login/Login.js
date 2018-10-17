import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import logo from '../../LogoBlue.png'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    // borderStyle: 'solid',
    // borderWidth: 5,
    // borderColor: '#1c4587'
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  root: {
    '&$disabled': {
      fontColor: 'white',
    }
  }
});

class Login extends Component {
  state = {
    open: false,
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{padding: 20, textAlign: 'center', backgroundColor: '#FFF3E0',}}>
        <DialogTitle id="scroll-dialog-title" className={classes.root} style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',}}>
          <Avatar style={{
            width: 190,
            height: 180,
            backgroundColor: '#ff5722',
            borderStyle: 'solid',
            borderWidth: 8,
            borderColor: '#1c4587',}}>
            <img src={logo} onClick={(e) => this.toMain(e)} width="170" />
          </Avatar>
          <br/>
          <Typography variant="subheading" style={{color: '#1c4587', }} gutterBottom>
          Sign in your account
          </Typography>
        </DialogTitle>
        <DialogContent >
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            className={classes.textField}
            margin="normal"
          />
          <br/>
          <TextField
            id="outlined-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions style={{display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',}}>
          <Button style={{ color: 'white',
                            fontSize: 18,
                            backgroundColor:'#1c4587',
                            width: 300,
                            height: 60,
                            marginLeft: 10}}>
            LOGIN
          </Button>
          <Divider/>
        </DialogActions>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
