import React from 'react';
import PropTypes from 'prop-types';
import '../contacts/addContact.css';

const InputGroup = props => {
  //we need to have the label, value, name, placehodler, type and onChange
  const {
    label,
    value,
    name,
    placeholder,
    type,
    onChange,
    error,
    className
  } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
      />
      {error}
    </div>
  );
};

InputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: 'text'
};

export default InputGroup;
