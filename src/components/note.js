import React, { Component } from 'react';
import { Link } from 'react-router'
import cookie from 'react-cookie';

import Store from '../lib/store';
var store = new Store();

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '', title: '', text: '', user: {}, tags: []};
    
    if (!cookie.load('username')) {
      this.props.history.push('/login');
    }

    store.findNote(this.props.params.id, (error, note) => {
      console.log('note:', note);
      console.log('note.title:', note.get('title'));
      this.setState({
        id: note.id,
        title: note.get('title'),
        text: note.get('text'),
        user: note.get('user'),
        tags: note.get('tags')
      });
    });
  }

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-content">
            <h2 className="title is-3">{this.state.title}</h2>

            <div className="note-text">
              {this.state.text}
            </div>

            <br/>

            <div className="user-info">
              <h1 className="subtitle">Users</h1>
              User info...
            </div>

            <br/>

            <div className="columns">
              <div className="tag-info column is-12">
                <h1 className="subtitle">Tags</h1>
                <ul className="tags">
                  {this.state.tags.map((tag, index) => {
                    return <li key={index}><Link to={`/tags/${tag}`}><span className="tag is-info">{tag}</span></Link></li>
                  })}
                </ul>
              </div>
            </div>

            <Link to={`/notes/${this.state.id}/edit`} className="button is-small">Edit Note</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Note;
