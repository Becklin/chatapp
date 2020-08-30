import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { ArrowLeftCircle, PeopleFill } from 'react-bootstrap-icons';
import './index.scss';

const InfoBar = ({room, counts}) => (
    <Row className="chat__infoBar">
        <Col xs={7} ><h3>{room}</h3></Col>
        <Col xs={3} >{counts} <PeopleFill color="#ffffff" size={24}/></Col>
        <Col xs={2} >
            <Link to="/">
                <ArrowLeftCircle color="white" size={24} />
            </Link>
        </Col>        
    </Row>
);

export default React.memo(InfoBar);