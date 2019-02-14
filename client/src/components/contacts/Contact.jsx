import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './contact.css';
import swal from 'sweetalert';
import { Consumer } from '../../context';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Contact extends Component {
  //create state, set a variable named showInfo to false, and condition the ul to be rendered only if it is true
  state = {
    showInfo: false
  };

  toggleInfo = () => {
    this.setState({
      showInfo: !this.state.showInfo
    });
  };

  deleteContact = (id, dispatch) => {
    swal({
      title: 'Are you sure?',
      text: 'This contact will be permanently deleted',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(async willDelete => {
      if (willDelete) {
        //este try catch tengo que cambiarlo una vez que haya conectado la base de datos
        try {
          await axios.delete(`/api/contacts/delete/${id}`);
          dispatch({ type: 'DELETE_CONTACT', payload: id });
        } catch (e) {
          console.log(e);
        }
        swal({
          title: 'Success!',
          text: 'Contact deleted',
          icon: 'success'
        });
      } else {
        swal('Deletion cancelled!');
      }
    });
  };

  render() {
    const { id, firstName, lastName, email, phone } = this.props.contact;
    const { showInfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div style={card}>
              <h4 style={nameStyle}>
                {firstName} {lastName}
                <i
                  style={{
                    position: 'relative',
                    left: '.3em',
                    cursor: 'pointer'
                  }}
                  className="fa fa-address-card"
                  onClick={this.toggleInfo}
                />
                <i
                  className="fa fa-trash"
                  style={deleteIcon}
                  onClick={this.deleteContact.bind(this, id, dispatch)}
                />
                <NavLink to={`contact/edit/${id}`}>
                  <i className="fa fa-edit" style={editIcon} />
                </NavLink>
              </h4>
              {showInfo ? (
                <ul style={listStyle} className="contact--info">
                  <li style={listItems}>
                    <strong>Email:</strong>
                    {email}
                    <a style={emailButton} href={`mailto:${email}`}>
                      Send Email
                    </a>
                  </li>
                  <li style={listItems}>
                    <strong>Phone:</strong>
                    {phone}
                  </li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

const card = {
  border: '2px solid #eee',
  width: '70%',
  margin: '1em auto',
  borderRadius: '10px',
  backgroundColor: '#FFFFFF'
};

const nameStyle = {
  padding: '.4em 0',
  paddingLeft: '1em',
  margin: '0',
  borderRadius: '7px',
  boxShadow: '0 0 10px 0 #000'
};

const listStyle = {
  border: '2px solid #eee',
  margin: '1em 2em',
  padding: '1em 2em',
  listStyleType: 'none'
};

const listItems = {
  padding: '.4em 1em',
  border: '1px solid #eee'
};

const deleteIcon = {
  float: 'right',
  marginRight: '1em'
};

const editIcon = {
  float: 'right',
  marginRight: '.5em',
  marginTop: '.1em',
  color: '#000'
};

const emailButton = {
  padding: '.3em',
  color: '#fff',
  backgroundColor: 'rgb(127, 216, 247)',
  float: 'right',
  transform: 'translateY(-3px)',
  borderRadius: '3px'
};

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
