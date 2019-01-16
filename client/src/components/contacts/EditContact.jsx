import React, { Component } from 'react';
import './addContact.css';
import { Consumer } from '../../context';
import InputGroup from '../layout/InputGroup';
//npm package that generates random id's on the fly
import swal from 'sweetalert';
import axios from 'axios';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {
      name: '',
      email: '',
      phone: ''
    }
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(`/contacts/edit/${id}`);
    const contact = res.data.data[0];
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  validateForm = ({ errors, ...rest }) => {
    let valid = true;
    //validate that the form isn't empty
    Object.values(rest).forEach(val => {
      val === '' && (valid = false);
    });
    //validate that the there aren't any errors
    Object.values(errors).forEach(val => {
      val.length > 0 && (valid = false);
    });
    return valid;
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    let errors = this.state.errors;
    const emailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    // console.log(this.state);
    switch (name) {
      case 'name':
        errors.name =
          value.length < 3 ? 'A minimum of 3 characters is required...' : '';
        break;
      case 'email':
        errors.email = emailRegex.test(value)
          ? ''
          : 'Please enter a valid email address...';
        break;
      case 'phone':
        errors.phone =
          value.length < 8
            ? 'Phone number must have at least 8 characters...'
            : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  clearInputs = e => {
    e.preventDefault();
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {
        name: '',
        email: '',
        phone: ''
      }
    });
  };

  addContact = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    //validation
    if (this.validateForm(this.state)) {
      const { id } = this.props.match.params;
      const updatedContact = { name, email, phone };
      //this put requests needs to be similar to the post request in add
      const res = await axios.put(
        `/contacts/update/${id}?name=${name}&email=${email}&phone=${phone}`,
        updatedContact
      );

      dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

      this.setState({
        name: '',
        email: '',
        phone: '',
        errors: { name: '', email: '', phone: '' }
      });
      swal({
        title: 'Success!',
        text: 'Contact has been updated',
        icon: 'success'
      })
        .then(() => this.props.history.push('/'))
        .then(() => window.location.reload());
    } else {
      swal({
        title: 'Error',
        text: 'Please fill out the required fields properly before submitting',
        icon: 'error'
      });
    }
  };

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="container">
              <div className="title-wrapper">
                <h1 className="title">Edit contact</h1>
              </div>
              <form onSubmit={this.addContact.bind(this, dispatch)}>
                <InputGroup
                  label="Name"
                  value={name}
                  placeholder="Enter name..."
                  name="name"
                  onChange={this.handleInputChange}
                  error={
                    errors.name.length > 0 && (
                      <p className="invalid">{errors.name}</p>
                    )
                  }
                  className={errors.name.length > 0 ? 'error-border' : null}
                />
                <InputGroup
                  type="email"
                  label="Email"
                  value={email}
                  placeholder="Enter email..."
                  name="email"
                  onChange={this.handleInputChange}
                  error={
                    errors.email.length > 0 && (
                      <p className="invalid">{errors.email}</p>
                    )
                  }
                  className={errors.email.length > 0 ? 'error-border' : null}
                />
                <InputGroup
                  type="tel"
                  value={phone}
                  label="Phone number"
                  placeholder="Enter phone number..."
                  name="phone"
                  onChange={this.handleInputChange}
                  error={
                    errors.phone.length > 0 && (
                      <p className="invalid">{errors.phone}</p>
                    )
                  }
                  className={errors.phone.length > 0 ? 'error-border' : null}
                />
                <div className="buttons">
                  <button id="add-btn">Update</button>
                  <button id="clear-btn" onClick={this.clearInputs}>
                    Clear
                  </button>
                </div>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;