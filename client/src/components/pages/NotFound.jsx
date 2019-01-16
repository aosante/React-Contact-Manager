import React from 'react';

const NotFound = props => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30vh'
      }}
    >
      <h1>
        <span style={{ color: 'rgb(127, 216, 247)' }}>404:</span> Page Not Found
      </h1>
      <p>Sorry, the requested page does not exist</p>
    </div>
  );
};

export default NotFound;
