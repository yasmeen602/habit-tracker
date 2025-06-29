

import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/signin');
  };

  return (
    <nav className="bg-slate-800 shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
        Habit Tracker
      </Link>
      
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Welcome, {user.email}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link 
            to="/signin" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  user: null,
};

export default Navbar;