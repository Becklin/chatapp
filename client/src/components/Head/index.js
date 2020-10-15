import React from 'react';
// import { Link } from 'react-router-dom';
// import { Jumbotron } from 'react-bootstrap';
// import { ArrowLeftCircle, PeopleFill } from 'react-bootstrap-icons';
import './index.scss';

const Head = ({ children }) => (
  <section className="chat__head">{children}</section>
);

export default Head;
