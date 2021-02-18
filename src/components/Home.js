import React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
      <div className="main-background">
        <NavLink to="/trivia" className="button-start-game" >
          Play!
        </NavLink>
      </div>
  );
}

export default Home;
