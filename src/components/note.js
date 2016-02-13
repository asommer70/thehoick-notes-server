import React, { Component } from 'react';
import { Link } from 'react-router'
import cookie from 'react-cookie';

import Store from '../lib/store';
var store = new Store();

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '', title: '', text: '', users: [], tags: [], share: false, shareUser: ''};

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
        users: note.get('users'),
        tags: note.get('tags')
      });
    });
  }

  shareNote(event) {
    console.log('sharing...');
    console.log('shareUser:', this.state.shareUser);
    console.log('this.state.users.indexOf:', this.state.users.indexOf(this.state.shareUser));
    if (this.state.users.indexOf(this.state.shareUser === -1)) {
      var users = this.state.users;
      users.push(this.state.shareUser);

      this.setState({users: users}, (note) => {
        store.updateNote(this.state, (error, note) => {
          if (error) {
            console.log('saveNote error:', error);
          }
          console.log('saveNote updated note:', note);
          this.setState({
            id: note.id,
            title: note.get('title'),
            text: note.get('text'),
            users: note.get('users'),
            tags: note.get('tags'),
            share: false,
            shareUser: ''
          });
          // this.props.history.push(`/notes/${note.id}`);
        });
      });
    }
  }

  render() {
    if (this.state.share) {
      var share = <input name="username" id="username" className="share is-small" type="text" placeholder="Username" onChange={event => this.setState({shareUser: event.target.value})} />;
      var shareButton = <button className="button is-small" onClick={event => this.shareNote(event)}>Share</button>;
      var cancelButton = <button className="button is-small" onClick={event => this.setState({share: false})}>Cancel</button>;
    } else {
      // var share = <Link to={`/notes/${this.state.id}/share`} className="button is-small share">Share Note</Link>;
      var share = <button className="button is-small share" onClick={event => this.setState({share: true})}>Share Note</button>;
      var shareButton = <span></span>
      var cancelButton = <span></span>
    }

    return (
      <div>
        <div className="card">
          <div className="card-content">
            <div className="columns">
              <div className="column is-6">
                <h2 className="title is-3">{this.state.title}</h2>
              </div>
              <div className="column is-6">
                <Link to={`/notes/${this.state.id}/edit`} className="button is-small">Edit Note</Link>
                <br/>
                {share}
                {shareButton} {cancelButton}
              </div>
            </div>

            <div className="columns">
              <div className="column is-12">
                <div className="note-text">
                  {this.state.text}
                </div>
              </div>
            </div>

            <br/>
            <hr/>
            <br/>

            <div className="columns">
              <div className="tag-info column is-6">
                <div className="user-info">
                  <span className="subtitle">Users:</span>
                  <ul className="users">
                    {this.state.users.map((user, index) => {
                      return <li key={index}>{user}</li>
                    })}
                  </ul>
                </div>
              </div>

              <div className="tag-info column is-6">
                <h1 className="subtitle">Tags</h1>
                <ul className="tags">
                  {this.state.tags.map((tag, index) => {
                    return <li key={index}><Link to={`/tags/${tag}`}><span className="tag is-info">{tag}</span></Link></li>
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Note;
