import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'


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
  // var notes = [{_id: 1, title: 'Beans Note...'}, {_id: 2, title: 'Tacos note...'}];
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Base}>
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('main')
);
