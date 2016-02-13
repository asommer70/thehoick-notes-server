import Parse from 'parse';

const ServerNotes = Parse.Object.extend('notes');

class Store {
  constructor() {
    Parse.initialize('com.thehoick.parse', 'jsHoickKey');
    Parse.serverURL = 'http://localhost:7070/parse/';
  }

  getNotes(callback) {
    var query = new Parse.Query(ServerNotes);

    query.find({
      success: (results) => {
        // results is an array of Parse.Object.
        console.log('store.getNotes results:', results);
        // this.setState({notes: results});
        callback(null, results);
      },

      error: function(error) {
        // error is an instance of Parse.Error.
        console.log('sotre.getNotes error:', error);
        callback(error, null);
      }
    });
  }

  findNote(noteId, callback) {
    console.log('findNote noteId:', noteId);
    const query = new Parse.Query(ServerNotes);
    query.get(noteId, {
      success: (result) => {
        callback(null, result);
      },
      error: (result, error) => {
        callback(error, result);
      }
    });
  }

  updateNote(note, callback) {
    console.log('updateNote...');
    const query = new Parse.Query(ServerNotes);

    query.get(note.id, {
      success: (result) => {
        result.save(note)
          .then((note) => {
            callback(null, note);
          }, (error) => {
            console.log('updateNote save error:', error);
            callback(error, null);
          });
      },
      error: (result, error) => {
        callback(error, result);
      }
    });
  }

  createNote(note, callback) {
    var newNote = new ServerNotes();

    newNote.set(note);

    newNote.save(null, {
      success: (note) => {
        console.log('note:', note);
        // Send to /notes/:id page.
        callback(null, note);
      },
      error: (error) => {
        callback(error, null);
      }
    });
  }

  deleteNote(note, callback) {
    const query = new Parse.Query(ServerNotes);
    query.get(note.id, {
      success: (result) => {
        result.destroy({
          wait: true,
          success: (note) => {
            console.log('store.deleteNote status:', note);
            callback({status: 'Note successfully deleted.'});
          }
        })
      },
      error: (result, error) => {
        callback(error, result);
      }
    });
  }

  createUser(username, password, callback) {
    var user = new Parse.User();
    user.set('username', username);
    user.set('password', password);

    user.signUp(null, {
      success: (user) => { t
        callback(null, {user});
      },
      error: (user, error) => {
        callback(error, {status: error.status});
      }
    });
  }

  signIn(username, password, callback) {
    Parse.User.logIn(username, password, {
      success: (user) => {
        console.log('store.signIn user:', user);
        callback(null, {user});
      },
      error: (user, error) => {
        callback(error, {status: error.status});
      }
    });
  }

  signOut(username) {
    // Parse.User.logout();
    Parse.User.logOut();
  }
}

export default Store;
