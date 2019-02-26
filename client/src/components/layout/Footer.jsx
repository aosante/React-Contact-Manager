import React from 'react';
import './footer.css';

const Footer = _ => {
  return (
    <div className="footer">
      <div className="social-links">
        <ul>
          <li>
            <a
              href="http://www.github.com/aosante"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-github" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/andr%C3%A9s-osante-alfaro-845701ba/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-linkedin" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/aosanaa/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
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
