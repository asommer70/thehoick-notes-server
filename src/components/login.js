import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'
import cookie from 'react-cookie';

import Store from '../lib/store';
var store = new Store();

class Login extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      username: '',
      password: '',
      errorMessage: '',
      messageVisible: false
    };
  }

  login() {
    console.log('logging in...');

    store.signIn(this.state.username, this.state.password, (error, user) => {
      console.log('error:', error, 'user:', user);
      if (error) {
        this.setState({errorMessage: error.message, messageVisible: true});
      } else {
        console.log('this.state.username:', this.state.username);
        cookie.save('username', this.state.username);
        this.props.history.push('/notes');
      }
    });
  }

  render() {
    return (
      <div>
      <div className="card">
        <div className="card-content">

          <div className={this.state.messageVisible ? 'columns' : 'columns hidden'}>
            <div className="column is-8">
              <div className="notification is-danger">
                <button className="delete" onClick={event => this.setState({messageVisible: false})}></button>
                {this.state.errorMessage}
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column is-4">
              <input name="username" id="title" type="text" placeholder="Username" onChange={event => this.setState({username: event.target.value})} />
            </div>
          </div>

          <div className="columns">
            <div className="column is-4">
              <input name="password" id="password" type="password" placeholder="Password" onChange={event => this.setState({password: event.target.value})} />
            </div>
          </div>


          <div className="columns">
            <div className="column is-4 control">
              <input type="submit" className="button is-success" value="Login" onClick={this.login.bind(this)} />
            </div>
            <div className="column is-4 control">
              <Link to="/signup">I don't have an account...</Link>
            </div>
          </div>

        </div>
      </div>
      </div>
    )
  }
}

export default Login;
