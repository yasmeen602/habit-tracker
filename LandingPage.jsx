import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing">
      <h1>Welcome to Habit Tracker</h1>
      <p>Track your daily habits, stay motivated, and build consistency!</p>
      <div className="buttons">
        <Link to="/register"><button>Register</button></Link>
        <Link to="/signin"><button>Sign In</button></Link>
      </div>
    </div>
  );
};

export default LandingPage;
