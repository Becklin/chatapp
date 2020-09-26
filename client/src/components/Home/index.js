import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ArrowLeftCircle, PeopleFill } from 'react-bootstrap-icons';
import './index.scss';

const Home = () => (
  <>
    <h1>Welcome to EazyChat</h1>
    <Link to="/signup">Sign up</Link>
    <Link to="/login">Login</Link>
  </>
);

export default Home;
