import React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
      <div className="main-background">
        <div className="home-text-container">
          <div className="home-text">
            <h1>Test your sports knowledge!</h1>
            <h1>3 minutes to answer 20 questions.</h1>
            <h1>Answer 15 correctly to win!</h1>
          </div>
          <NavLink to="/trivia" className="button-start-game" >
            Play!
          </NavLink>
        </div>
      </div>
  );
}

export default Home;
