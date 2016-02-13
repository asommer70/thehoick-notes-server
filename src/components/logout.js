import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'
import cookie from 'react-cookie';

import Store from '../lib/store';
var store = new Store();

class Logout extends Component {
  constructor(props) {
    super(props);
    store.signOut();
    cookie.remove('username');
    this.props.history.push('/login');
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default Logout;
