import React from 'react';
import FileContext from './FileContext';

class AddFolder extends React.Component {
  static contextType = FileContext;
  state = {
    name: '',
    folders: [],
    error: '',
  };

  setName = (name) => {
    this.setState({ name: name });
  };

  folderList = function () {
    let folders = [];
    this.context.folders.forEach((folder) => {
      folders.push(folder.name);
    });
    return folders;
  };

  displayError(message) {
    this.setState({ error: message });
  }

  submitForm(e) {
    e.preventDefault();
    this.validateName();
  }

  validateName = () => {
    let name = this.state.name;
    let folders = this.folderList();

    if (name.length === 0) {
      this.displayError('Name is required');
    } else if (folders.includes(name)) {
      this.displayError('Folder already exists!');
    } else {
      this.postFolder(name);
    }
  };

  postFolder(name) {
    this.context.addFolder(name);
  }

  render() {
    console.log(this.context);

    return (
      <div className="addForm">
        <h2>Add a folder</h2>
        <form onSubmit={(e) => this.submitForm(e)}>
          <label htmlFor="folder-name">Folder Name</label>
          <input
            type="text"
            id="folder-name"
            name="folder-name"
            value={this.state.name.value}
            onChange={(e) => this.setName(e.target.value)}
          ></input>
          <button type="submit">Add</button>
          <p className="error">{this.state.error}</p>
        </form>
      </div>
    );
  }
}

export default AddFolder;
