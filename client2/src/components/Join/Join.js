import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './join.scss';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="join-wrapper">
            <h1>Join</h1>
            <div><input placeholder="name" onChange={(e) => setName(e.target.value)} /></div>
            <div><input placeholder="room" onChange={(e) => setRoom(e.target.value)} /></div>
            <Link onClick={event => (!name||!room) ? event.preventDefault(): null} to={`/chat?name=${name}&room=${room}`}>
                <Button className="button" type="submit">Join In</Button>
            </Link>
            <Container fluid>
                <Row>
                    <Col>1 of 1</Col>
                </Row>
            </Container>
        </div>
    )
};

export default Join;