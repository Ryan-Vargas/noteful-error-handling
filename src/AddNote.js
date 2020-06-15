import React from 'react';
import FileContext from './FileContext';
import { Redirect } from 'react-router-dom';

class AddNote extends React.Component {
  static contextType = FileContext;
  state = {
    name: '',
    content: '',
    folderSelected: '',
    folders: [],
    error: '',
    submittingNote: false,
  };

  setName = (name) => {
    this.setState({ name: name });
  };

  setContent = (content) => {
    this.setState({ content: content });
  };

  noteNameList = function () {
    let noteNames = [];
    this.context.notes.forEach((note) => {
      noteNames.push(note.name);
    });
    return noteNames;
  };

  noteContentList = function () {
    let noteNames = [];
    this.context.notes.forEach((note) => {
      noteNames.push(note.content);
    });
    return noteNames;
  };

  displayError(message) {
    this.setState({ error: message });
  }

  submitForm(e) {
    e.preventDefault();
    this.validateName();
    this.setState({ submittingNote: true });
  }

  validateName = () => {
    let name = this.state.name;
    let content = this.state.content;
    let folderSelected = this.state.folderSelected;
    let noteNameList = this.noteNameList();
    let errorMessage = '';
    if (name.length === 0) {
      errorMessage += 'You must enter a name.';
    } else if (noteNameList.includes(name)) {
      errorMessage += 'That name already exists.';
    }
    errorMessage += this.validateContent();
    if (errorMessage !== '') {
      this.displayError(errorMessage);
    } else {
      this.postNote(name, folderSelected, content);
    }
  };

  postNote(name, folder, content) {
    let modified = new Date().toISOString();
    if (folder === '') {
      folder += this.context.folders[0].id;
    }
    this.context.addNote(name, folder, content, modified);
  }

  validateContent = () => {
    let content = this.state.content;
    let noteContentList = this.noteContentList();
    let errorMessage = '';
    if (content.length === 0) {
      errorMessage += 'You must enter content.';
    } else if (noteContentList.includes(content)) {
      errorMessage += 'That content already exists.';
    }
    return errorMessage;
  };

  getFolderName = (e) => {
    this.setState({ folderSelected: e });
  };

  render() {
    if (this.state.submittingNote && this.state.error === '') {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <form onSubmit={(e) => this.submitForm(e)}>
        <h2>Add a note</h2>
        <label htmlFor="note-name">Note Name</label>
        <input
          type="text"
          id="note-name"
          name="note-name"
          value={this.state.name.value}
          onChange={(e) => this.setName(e.target.value)}
        ></input>
        <label htmlFor="note-content">Content</label>
        <input
          type="text"
          id="note-content"
          name="note-content"
          value={this.state.content.value}
          onChange={(e) => this.setContent(e.target.value)}
        ></input>
        <label htmlFor="folder-name">Folder Name</label>
        <select onChange={(e) => this.getFolderName(e.target.value)}>
          {this.context.folders.map((folder) => {
            return <option value={folder.id}>{folder.name}</option>;
          })}
        </select>
        <button type="submit">Add</button>
        <p className="error">{this.state.error}</p>
      </form>
    );
  }
}

export default AddNote;
