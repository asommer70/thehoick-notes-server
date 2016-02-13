import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import cookie from 'react-cookie';

import Notes from './components/notes';
import Note from './components/note';
import NoteForm from './components/note_form';
import Login from './components/login';
import Signup from './components/signup';
import Logout from './components/logout';

const Base = React.createClass({
  render() {
    return (
      <div className="columns">
        <div className="column is-2">
          <h1 className="title">The Hoick Notes</h1>
          <p>
            {cookie.load('username') ? `Welcome ${cookie.load('username')}`: ''}
          </p>
        </div>
        <div className="column is-8">

          <Link to="/notes" className="button is-primary">Notes</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/notes/new" className="button">New Note</Link>
          <Link to="/logout" className="button is-info is-outlined is-pulled-right">Log Out</Link>
          <hr/>
          {this.props.children}
        </div>
      </div>
    )
  }
})

class App extends Component {
  // static contextTypes = {
  // router: React.PropTypes.object.isRequired
  // }
  constructor() {
    super();
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Base}>
          <Route path="/notes" component={Notes}/>
          <Route path="/notes/new" component={NoteForm}/>
          <Route path="/notes/:id" component={Note}/>
          <Route path="/notes/:id/edit" component={NoteForm}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/logout" component={Logout}/>
          <Route path="*" component={Notes}/>
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('main')
);
