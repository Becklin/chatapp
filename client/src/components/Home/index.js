import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../util/auth';
import './index.scss';

const Home = () => (
  <div className="chat-home">
    <h1>Fresh Talk</h1>
    <div className="chat-home__controls">
      <Link to="/signup">Sign up</Link>
      {AuthService.getCurrentUser() ? (
        <Link to="/join">Join</Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  </div>
);

export default Home;
