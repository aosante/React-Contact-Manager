import React from 'react';
// import PropTypes from 'prop-types';

const About = props => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '30vh'
      }}
    >
      <h1>
        <span style={{ color: 'rgb(127, 216, 247)' }}>React</span> Contact
        Manager
      </h1>
      <p>A small app to manage your contacts in a simple way</p>
      <p>Coded by Andrés Osante</p>
      <p>Version 1.0.0</p>
      <a
        style={{ fontSize: '1.15em', textDecoration: 'none', color: 'purple' }}
        href="https://github.com/aosante"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>
      <br />
      <a
        style={{ fontSize: '1.15em', textDecoration: 'none', color: 'purple' }}
        href="https://linkedin.com/aosante"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    </div>
  );
};

// About.propTypes = {};

export default About;
