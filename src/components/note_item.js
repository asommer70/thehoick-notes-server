import React from 'react';
import { Link } from 'react-router'

const NoteItem = ({note}) => {
  console.log('note:', note.createdAt.getDate() - 1);
  const created_at = `${note.createdAt.getMonth() + 1}-${note.createdAt.getDate() - 1}-${note.createdAt.getFullYear()}`;
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
                </div>
              </div>

              <div className="content">
                {note.get('text')}
                <br/>
                <br/>
                <p className="subtitle is-6">@{note.get('created_by')}</p>
                <small>{created_at}</small>
              </div>
            </div>
          </div>

        </div>
      </div>
    </li>
  )
}

export default NoteItem;
