import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ArrowLeftCircle, PeopleFill } from 'react-bootstrap-icons';
import './index.scss';

const Home = () => (
  <div className="chat-home">
    <h1>Fresh Talk</h1>
    <div className="chat-home__controls">
      <Link to="/signup">Sign up</Link>
      <Link to="/login">Login</Link>
    </div>
  </div>
);

export default Home;
