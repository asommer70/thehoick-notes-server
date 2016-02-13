import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'

import Notes from './components/notes';
import Note from './components/note';
import NoteForm from './components/note_form';

const Base = React.createClass({
  render() {
    return (
      <div className="columns">
        <div className="column is-2"></div>
        <div className="column is-auto">

          <h1 className="title">The Hoick Notes</h1>
          <Link to={'/'} className="button is-primary">Home</Link>
          &nbsp;
          <Link to="/notes" className="button is-primary">Notes</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/notes/new" className="button">New Note</Link>
          <hr/>
          {this.props.children}
        </div>
        <div className="column is-2"></div>
      </div>
    )
  }
})

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Base}>
        <Route path="/notes" component={Notes}/>
        <Route path="/notes/new" component={NoteForm}/>
        <Route path="/notes/:id" component={Note}/>
        <Route path="/notes/:id/edit" component={NoteForm}/>
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
