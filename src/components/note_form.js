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
    this.state = {id: '', title: '', text: '', users: [this.username], tags: [], new: true};

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
          new: false
        });
      });
    }

    socket.on('text-entered', (obj) => {
      console.log('txt:', obj.txt, 'name:', obj.name);

      var newState = {};
      newState[obj.name] = obj.txt;
      this.setState(newState);
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
      if (!this.state.users.indexOf(this.username)) {
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

  onChange(event) {
    // this.setState({title: event.target.value})
    // socket.emit('text-entered', event);
    console.log('event:', event.target.name);
    var newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
    // this.socket.send('message', 'I am the client and I\'m listening!');
    this.socket.send(event.target.value);
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
                  onChange={event => socket.emit('text-entered', {txt: event.target.value, name: event.target.name})} />
              </div>
            </div>

            <div className="columns">
              <div className="column is-4">
                <label htmlFor="text">{this.state.new ? '' : 'Text'}</label>
                <textarea name="text" id="text" placeholder="Text" value={this.state.text}
                  onChange={event => socket.emit('text-entered', {txt: event.target.value, name: event.target.name})}></textarea>
              </div>
            </div>

            <div className="columns">
              <div className="column is-4">
                User info...
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
