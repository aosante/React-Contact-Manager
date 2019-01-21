import React, { Component } from 'react';
import axios from 'axios';
//THIS IS A TEST BRAH
const Context = React.createContext();

const reducer = (state, action) => {
  //the action will be an object passed to the dispatch function containing the type and payload properties
  switch (action.type) {
    //this case is passed to the dispatch function in the contact component
    case 'DELETE_CONTACT':
      return {
        //the spread operator enables access to the initial state
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        //adds the new contact to the beggining of the contacts array, and then spreads the rest of the state
        contacts: [action.payload, ...state.contacts]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };
    default:
      return state;
  }
};

//this is where we are going to have our state
export class Provider extends Component {
  state = {
    contacts: [],
    //modifies the state, and calls reducer to execute the desired action
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount() {
    this.getContacts();
  }

  getContacts = async _ => {
    const res = await axios.get('/api/contacts');
    this.setState({ contacts: res.data.data });
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
