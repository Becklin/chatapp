import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { Jumbotron } from 'react-bootstrap';
// import { ArrowLeftCircle, PeopleFill } from 'react-bootstrap-icons';
import { StatusContext } from '../../context/status-context';
import './index.scss';

const Head = ({ children }) => {
  const [status] = useContext(StatusContext);
  return (
    <section className="chat__head">
      {children}
      {status}
    </section>
  );
};

export default Head;
