import React from 'react';
import { Link } from 'react-router'

const NoteItem = ({note}) => {
  return (
    <li>
      <div className="columns">
        <div className="column is-8">

          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-5">
                    <Link to={`/notes/${note.id}`}>{note.get('title')}</Link>
                  </p>
                  <p className="subtitle is-6">@noteauthor...</p>
                </div>
              </div>

              <div className="content">
                {note.get('text')}
                <a href="#">#tag1</a> <a href="#">#tag2</a>
                <br/>
                <small>{note.created_at}</small>
              </div>
            </div>
          </div>

        </div>
      </div>
    </li>
  )
}

export default NoteItem;
