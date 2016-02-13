import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'

import Store from '../lib/store';
var store = new Store();

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      username: '',
      password: '',
      confirmPass: '',
      errorMessage: '',
      messageVisible: false,
    };
  }

  signup() {
    console.log('signing up...');
    if (this.state.password !== this.state.confirmPass ) {
      return this.setState({errorMessage: 'Your passwords do not match', messageVisible: true});
    }

    store.createUser(this.state.username, this.state.password, (error, user) => {
      if (error) {
        this.setState({errorMessage: error.message, messageVisible: true});
      } else {
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
            <div className="column is-4">
              <input name="confirm_pass" id="confirm_pass" type="password" placeholder="Confirm Password" onChange={event => this.setState({confirmPass: event.target.value})} />
            </div>
          </div>

          <div className="columns">
            <div className="column is-4 control">
              <input type="submit" className="button is-success" value="Sign Up" onClick={this.signup.bind(this)} />
            </div>
            <div className="column is-4 control">
              <Link to="/login">I have an account...</Link>
            </div>
          </div>

        </div>
      </div>
      </div>
    )
  }
}

export default Signup;
