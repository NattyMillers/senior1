import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';

import Main from './Pages/Main'
import Profile from './Pages/Profile'
import AppBar from './Components/NavBar/AppBarr'
import FullProduct from'./Pages/FullProduct'

class MainApp extends Component{
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
      loading: true,
    };
  }

  render() {
    return(
      <div>
        <Router>
            <div >
              <Route component={AppBar}/>
              <Route exact path="/" component={Main} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/fullproduct/:id" component={FullProduct} />

            </div>
          </Router>
      </div>
    )
  }
}

ReactDOM.render(<MainApp />, document.getElementById('root'));
// registerServiceWorker();
