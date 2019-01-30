import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-box">
        <h1>Welcome to your Contact Manager</h1>
        <hr />
        <p>
          A simple application built to manage your contacts easily and quickly
        </p>
        <div className="buttons">
          <Link to="/contacts">
            <button className="bgn home-btn">Begin</button>
          </Link>
          <Link to="/about">
            <button className="home-btn">Learn More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
