import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'
import cookie from 'react-cookie';

import Store from '../lib/store';
var store = new Store();
var socket = io();

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.username = cookie.load('username');
    this.state = {id: '', title: '', text: '', users: [this.username], tags: [], created_by: this.username, new: true, currentUsers: [this.username]};
    if (!this.username) {
      this.props.history.push('/login');
    }

    if (props.route.path != '/notes/new') {
      store.findNote(this.props.params.id, (error, note) => {
        console.log('note:', note);
        this.setState({
          id: note.id,
          title: note.get('title'),
          text: note.get('text'),
          users: note.get('users'),
          tags: note.get('tags'),
          created_by: note.get('created_by'),
          new: false
        }, (note) => {
          console.log('this.state.currentUsers:', this.state.currentUsers);

          document.getElementById('text').style.height = document.getElementById('text').scrollHeight + 5 + 'px';
        });
      });
    }

    socket.on('text-entered', (obj) => {
      console.log('txt:', obj.txt, 'name:', obj.name);

      if (obj.platform != 'web') {
        var newState = {};
        newState[obj.name] = obj.txt;

        // Add the new Note user if it's they're not already in the list.
        var currentUsers = this.state.currentUsers;
        if (currentUsers.indexOf(obj.username) === -1) {
          currentUsers.push(obj.username);
          newState.currentUsers = currentUsers;
        }

        this.setState(newState);
      }
    });
  }

  saveNote(event) {
    console.log('saveNote this.state:', this.state);
    if (this.state.new) {
      // Create Note.
      store.createNote(this.state, (error, note) => {
        if (error) {
          console.log('saveNote error:', error);
        }
        this.setState({note});
        this.props.history.push('/notes');
      });
    } else {
      // Update Note.
      if (this.state.users.indexOf(this.username) === -1) {
        var users = this.state.users;
        users.push(this.username);
        this.setState({users: users}, () => {
          store.updateNote(this.state, (error, note) => {
            if (error) {
              console.log('saveNote error:', error);
            }
            console.log('saveNote updated note:', note);
            this.setState({note});
            console.log('this.props:', this.props);
            this.props.history.push(`/notes/${note.id}`);
          });
        })
      } else {
        store.updateNote(this.state, (error, note) => {
          if (error) {
            console.log('saveNote error:', error);
          }
          console.log('saveNote updated note:', note);
          this.setState({note});
          console.log('this.props:', this.props);
          this.props.history.push(`/notes/${note.id}`);
        });
      }
    }
  }

  deleteNote(event) {
    console.log('deleting note...');
    store.deleteNote(this.state, (status) => {
      console.log('deleteNote status:', status);
      this.props.history.push('/notes');
    });
  }

  textChange(event) {
    this.setState({text: event.target.value});
    socket.emit('text-entered', {txt: event.target.value, name: event.target.name, platform: 'web', username: this.username});
  }

  textChange(event) {
    this.setState({text: event.target.value});
    socket.emit('text-entered', {txt: event.target.value, name: event.target.name, platform: 'web', username: this.username});
  }

  render() {
    var deleteButton = <span></span>;
    if (!this.state.new) {
      deleteButton = <input type="submit" className="button is-small is-outlined is-danger" value="Delete Note" onClick={this.deleteNote.bind(this)} />;
    }

    return (
      <div>
        <div className="card">
          <div className="card-content">
            <h3 className="title is-4">{this.state.new ? 'New Note' : `Edit Note: ${this.state.title}`}</h3>
            <div className="columns">
              <div className="column is-4">
                <label htmlFor="title">{this.state.new ? '' : 'Title'}</label>
                <input name="title" id="title" type="text" placeholder="Title" value={this.state.title}
                  onChange={event => this.titleChange(event).bind(this)} />
              </div>
            </div>

            <div className="columns">
              <div className="column is-4">
                <label htmlFor="text">{this.state.new ? '' : 'Text'}</label>
                <textarea name="text" id="text" placeholder="Text" value={this.state.text}
                  onChange={event => this.textChange(event).bind(this)}></textarea>
              </div>
            </div>

            <div className="columns">
              <div className="column is-4">
                <div className="user-info">
                  <span className="subtitle">Users:</span>
                  <ul className="users">
                    {this.state.users.map((user, index) => {
                      return <li key={index}>{user}</li>
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column is-4">
                <div className="user-info">
                  <span className="subtitle">Current Users:</span>
                  <ul className="users">
                    {this.state.currentUsers.map((user, index) => {
                      return <li key={index}>
                        <span className="tag is-warning">{user}</span>
                      </li>
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column is-12">
                <ul className="tags">
                  {this.state.tags.map((tag, index) => {
                    return <li key={index}>
                    <span className="tag is-info">
                      {tag}
                      <button className="delete"></button>
                    </span>
                   </li>
                  })}
                </ul>
              </div>
            </div>

            <div className="columns">
              <div className="column is-4">
                <input type="submit" className="button is-success" value="Save Note" onClick={this.saveNote.bind(this)} />
              </div>
            </div>

            <div className="columns is-pulled-right">
              <div className="column is-2">
                {deleteButton}
              </div>
            </div>
            <br/>

          </div>
        </div>
      </div>
    )
  }
}

export default NoteForm;
