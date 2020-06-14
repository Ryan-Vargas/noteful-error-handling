import React from 'react';
import Note from './Note';
import FileContext from './FileContext';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class NotesList extends React.Component {
  static contextType = FileContext;

  render() {
    let notes = [];

    if (typeof this.props.routeProps !== 'undefined') {
      let folderName = this.props.routeProps.match.params.folderName;
      let folderMatch = this.context.folders.filter(
        (folder) => folder.name === folderName
      );
      if (folderMatch.length === 0) {
        return <Redirect to="/"></Redirect>;
      }
      let folderId = folderMatch[0].id;
      let notesInFolder = this.context.notes.filter(
        (note) => note.folderId === folderId
      );
      notesInFolder.forEach((note) => {
        notes.push(<Note key={note.id} note={note} isLink={true} />);
      });
    } else {
      this.context.notes.forEach((note) => {
        notes.push(<Note key={note.id} note={note} isLink={true} />);
      });
    }

    return (
      <div>
        {notes}
        <NavLink to="/add/note" className="addNoteLink">
          Add note
        </NavLink>
      </div>
    );
  }
}

NotesList.propTypes = {
  routeProps: PropTypes.object,
};

export default NotesList;
