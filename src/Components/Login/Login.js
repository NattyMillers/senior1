import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabLogin from './Tab1Login'
import TabSignup from './Tab2Signup'

class Login extends Component {

  constructor(props) {
      super(props);
      this.state = {
        open: false,
        value: 0,
      }
  }

  handleChange = (event, value) => {
      this.setState({ value });
    };

  closeLogin = () => {
    this.props.butty()
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div style={{padding: 20, textAlign: 'center', backgroundColor: '#FFF3E0',}}>
        <Tabs
          fullWidth
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollable
          scrollButtons="auto"
        >
          <Tab label="Log In" />
          <Tab label="Sign Up" />
        </Tabs>
        {value === 0 && <TabLogin butty={this.closeLogin}/>}
        {value === 1 && <TabSignup/>}
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Login;
