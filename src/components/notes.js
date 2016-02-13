import React, { Component } from 'react';
import cookie from 'react-cookie';

import NoteItem from './note_item';
import Store from '../lib/store';

var store = new Store();

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {notes: []};

    if (!cookie.load('username')) {
      this.props.history.push('/login');
    }

    store.getNotes((error, notes) => {
      if (error) {
        console.log('Notes store.getNotes error:', error);
      }
      this.setState({notes});
    });
  }

  render() {
    const noteItems = this.state.notes.map((note) => {
      return <NoteItem key={note.id} note={note} />
    });

    return (
      <ul className="notes">
        {noteItems}
      </ul>
    )
  }
}

export default Notes;
