import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ArrowLeftCircle, PeopleFill } from 'react-bootstrap-icons';
import './index.scss';

const Home = () => (
  <>
    <h1>Welcome to EazyChat</h1>
    <Link to="/Sign up">Sign up</Link>
    <Link to="/protected">Login</Link>
  </>
);

export default Home;
