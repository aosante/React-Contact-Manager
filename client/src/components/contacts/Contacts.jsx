import React, { Component } from 'react';
import Contact from './Contact';
import { Consumer } from '../../context';
import './contacts.css';

class Contacts extends Component {
  render() {
    //value holds the state from the context API
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <React.Fragment>
              <h1 style={title}>Contact List</h1>
              {contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;

const title = {
  display: 'flex',
  justifyContent: 'center',
  borderBottom: '5px solid rgb(127, 216, 247)',
  paddingBottom: '.2em',
  letterSpacing: '6px',
  width: '30%',
  margin: '1em auto'
};
