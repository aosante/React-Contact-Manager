import React from 'react';
import './footer.css';

const Footer = props => {
  return (
    <div className="footer">
      <div className="social-links">
        <ul>
          <li>
            <a>
              <i className="fa fa-github" />
            </a>
          </li>
          <li>
            <a>
              <i className="fa fa-linkedin" />
            </a>
          </li>
          <li>
            <a>
              <i className="fa fa-instagram" />
            </a>
          </li>
        </ul>
      </div>
      <div className="name">
        <p>
          Andrés Osante <span>&copy; 2019</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
