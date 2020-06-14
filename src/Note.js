import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import FileContext from './FileContext';
import PropTypes from 'prop-types';

class Note extends React.Component {
  static contextType = FileContext;

  render() {
    if (this.props.note === undefined) {
      return <Redirect to="/"></Redirect>;
    }
    let noteFolderId = this.props.note.folderId;
    let noteFolder = this.context.folders.filter(
      (folder) => folder.id === noteFolderId
    );
    let navLink = `/folder/${noteFolder[0].name}/${this.props.note.name}`;

    let modifiedDate = new Date(this.props.note.modified);

    let date = modifiedDate.getDate();
    let month = modifiedDate.getMonth();
    let year = modifiedDate.getFullYear();
    let dateString = date.toString();

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    if (dateString.length === 2 && dateString[0] === '1') {
      date += 'th';
    } else if (dateString[dateString.length - 1] === '1') {
      date += 'st';
    } else if (dateString[dateString.length - 1] === '2') {
      date += 'nd';
    } else if (dateString[dateString.length - 1] === '3') {
      date += 'rd';
    } else {
      date += 'th';
    }
    month = months[month];

    let fullDate = `${date} ${month} ${year}`;

    const handleClick = (e) => {
      if (!this.props.isLink) {
        e.preventDefault();
      }
    };
    let isLinkClass = 'isLink-' + this.props.isLink;

    const buttonClick = (e) => {
      e.preventDefault();
      this.context.deleteNote(this.props.note.id);
    };

    return (
      <NavLink
        to={navLink}
        onClick={(e) => handleClick(e)}
        className={isLinkClass}
      >
        <div className="title">
          <h2>{this.props.note.name}</h2>
          <p>Date modified on {fullDate}</p>
        </div>
        <button type="button" onClick={(e) => buttonClick(e)}>
          Delete Note
        </button>
      </NavLink>
    );
  }
}

Note.propTypes = {
  isLink: PropTypes.bool.isRequired,
  note: PropTypes.object.isRequired,
};

export default Note;
