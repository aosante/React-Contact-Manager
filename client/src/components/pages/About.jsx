import React from 'react';

const About = _ => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '30vh',
        width: '90%',
        margin: '0 auto',
        textAlign: 'center'
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
        style={{
          fontSize: '1.15em',
          textDecoration: 'none',
          color: '#000',
          textDecoration: 'underline'
        }}
        href="https://github.com/aosante"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i
          className="fa fa-github"
          style={{ marginRight: '.35em', color: 'rgb(127, 216, 247)' }}
        />
        Github
      </a>
      <br />

      <a
        style={{
          fontSize: '1.15em',
          textDecoration: 'none',
          color: '#000',
          textDecoration: 'underline'
        }}
        href="https://linkedin.com/aosante"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i
          className="fa fa-linkedin"
          style={{ marginRight: '.35em', color: 'rgb(127, 216, 247)' }}
        />
        LinkedIn
      </a>
    </div>
  );
};

export default About;
