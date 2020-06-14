import React from 'react';
import { Redirect } from 'react-router-dom';
const FileContext = React.createContext();
export default FileContext;

export class FileContextProvider extends React.Component {
  state = {
    folders: null,
    notes: null,
  };

  componentDidMount = () => {
    fetch('http://localhost:9090/folders')
      .then((res) => {
        return res.json();
      })
      .then((folders) => {
        this.setState({
          folders: folders,
        });
      });

    fetch('http://localhost:9090/notes')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong.');
        }
        return res.json();
      })
      .then((notes) => {
        this.setState({
          notes: notes,
        });
      })
      .catch((error) => {
        return error.message;
      });
  };

  addFolder = (folderName) => {
    console.log(folderName);
    let body = { name: folderName };

    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong.');
        }
        return res.json();
      })
      .then((data) => {
        let folders = this.state.folders;
        folders.push(data);
        this.setState({
          folders: folders,
        });
      })
      .catch((error) => {
        return error.message;
      });
  };

  addNote = (noteName, folderId, content, dateModified) => {
    let body = {
      name: noteName,
      modified: dateModified,
      folderId: folderId,
      content: content,
    };

    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong.');
        }
        return res.json();
      })
      .then((data) => {
        let notes = this.state.notes;
        notes.push(data);
        this.setState({
          notes: notes,
        });
      })
      .catch((error) => {
        return error.message;
      });
  };

  deleteNote = (noteID) => {
    fetch(`http://localhost:9090/notes/${noteID}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong.');
        }
        return res.json();
      })
      .then((data) => {
        let newNotes = this.state.notes.filter((note) => note.id !== noteID);
        this.setState({
          notes: newNotes,
        });
      })
      .catch((error) => {
        return error.message;
      });
  };

  render() {
    if (this.state.folders === null || this.state.notes === null) {
      return <div>Loading</div>;
    }
    return (
      <FileContext.Provider
        value={{
          folders: this.state.folders,
          notes: this.state.notes,
          addFolder: this.addFolder,
          addNote: this.addNote,
          deleteNote: this.deleteNote,
        }}
      >
        {this.props.children}
      </FileContext.Provider>
    );
  }
}
