import React from 'react';
import Note from './Note';
import FileContext from './FileContext';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class NoteDetails extends React.Component {
  static contextType = FileContext;

  render() {
    let noteName = this.props.routeProps.match.params.noteName;
    let noteMatch = this.context.notes.filter((note) => note.name === noteName);

    if (noteMatch.length === 0) {
      return <Redirect to='/'></Redirect>
    }

    return (
      <div>
        <Note note={noteMatch[0]} isLink={false}/>
        <p>{noteMatch[0].content}</p>
      </div>
    );
  }
}

NoteDetails.propTypes = {
  routeProps: PropTypes.object.isRequired,
}

export default NoteDetails;
