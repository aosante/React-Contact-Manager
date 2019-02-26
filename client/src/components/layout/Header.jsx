import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './header.css';

const Header = props => {
  const navToggle = _ => {
    const nav = document.querySelector('.site--nav');
    nav.classList.toggle('site--nav--open');
    const menu = document.querySelector('.menu-toggle');
    menu.classList.toggle('open');
  };

  const removeMobileNav = _ => {
    const nav = document.querySelector('.site--nav');
    const menu = document.querySelector('.menu-toggle');
    const windowWidth = window.innerWidth;
    const links = document.querySelectorAll('.link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (windowWidth < 770) {
          nav.classList.remove('site--nav--open');
          menu.classList.remove('open');
        }
      });
    });
  };

  const { branding } = props;
  return (
    <React.Fragment>
      <nav style={navStyle}>
        <a href="/" className="navbar-brand" style={brandStyle}>
          <svg
            style={{ marginRight: '.5em' }}
            width="40"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-11.5 -10.23174 23 20.46348"
          >
            <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
            <g stroke="#61dafb" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2" />
              <ellipse rx="11" ry="4.2" transform="rotate(60)" />
              <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
          </svg>
          <div className="branding--text">{branding}</div>
        </a>
        <div className="site--nav">
          <ul style={ulStyle} className="contact-list">
            <li style={liStyle} className="contact">
              <NavLink
                className="link"
                to="/contacts"
                style={linkStyles}
                activeStyle={{ color: 'rgb(127, 216, 247)' }}
                onClick={removeMobileNav}
              >
                <i
                  className="fa fa-users"
                  style={{ color: 'rgb(127, 216, 247)', marginRight: '.5em' }}
                />
                Contacts
              </NavLink>
            </li>
            <li style={liStyle} className="contact">
              <NavLink
                className="link"
                to="/contact/add"
                style={linkStyles}
                activeStyle={{ color: 'rgb(127, 216, 247)' }}
                onClick={removeMobileNav}
              >
                <i
                  className="fa fa-user-plus"
                  style={{ color: 'rgb(127, 216, 247)', marginRight: '.5em' }}
                />
                Add Contact
              </NavLink>
            </li>
            <li style={liStyle} className="contact">
              <NavLink
                className="link"
                to="/about"
                style={linkStyles}
                activeStyle={{ color: 'rgb(127, 216, 247)' }}
                onClick={removeMobileNav}
              >
                <i
                  className="fa fa-info-circle"
                  style={{ color: 'rgb(127, 216, 247)', marginRight: '.5em' }}
                />
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className="menu-toggle" onClick={navToggle}>
        <div className="hamburger" />
      </div>
    </React.Fragment>
  );
};

const navStyle = {
  backgroundColor: 'rgb(32, 35, 41)',
  height: '10.5vh',
  display: 'grid',
  gridTemplateColumns: '2fr 4fr',
  alignContent: 'center'
};

const brandStyle = {
  fontSize: '1.45em',
  color: 'rgb(127, 216, 247)',
  textDecoration: 'none',
  gridColumns: '1 / 3',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center'
};

const ulStyle = {
  display: 'flex',
  justifyContent: 'flex-end'
};

const liStyle = {
  listStyleType: 'none',
  gridColumns: '4 / 5',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center'
};

const linkStyles = {
  display: 'inline-block',
  padding: '.7em 3em',
  fontSize: '1.2em',
  textDecoration: 'none',
  color: '#FFFFFF',
  opacity: '.85'
};

Header.defaultProps = {
  branding: 'My App'
};

Header.propTyoes = {
  branding: PropTypes.string.isRequired
};

export default Header;
