import React from 'react';
import { Link } from 'react-router-dom';
// import { Row, Col } from 'react-bootstrap';
import { ArrowLeftCircle, PeopleFill } from 'react-bootstrap-icons';
import './index.scss';

const InfoBar = ({ room, counts }) => (
  <div className="chat__infoBar">
    <div className="chat__room">
      <h3>{room}</h3>
    </div>
    <div className="chat__count">
      {counts} <PeopleFill color="#ffffff" size={24} />
    </div>
    <div className="chat__back">
      <Link to="/">
        <ArrowLeftCircle color="white" size={24} />
      </Link>
    </div>
  </div>
);

export default React.memo(InfoBar);
