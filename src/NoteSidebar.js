import React from 'react';

function NoteSidebar(props) {
  let folderName = props.routeProps.match.params.folderName;

  return (
    <div className="note-sidebar">
      <button onClick={() => props.routeProps.history.goBack()}>Go back</button>
      <h2>{folderName}</h2>
    </div>
  );
}

export default NoteSidebar;
