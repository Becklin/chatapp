import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './join.scss';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <Container>
      <h1>Join</h1>
      <input
        className="chat__input"
        placeholder="name"
        onChange={e => setName(e.target.value)}
      />
      <input
        className="chat__input"
        placeholder="room"
        onChange={e => setRoom(e.target.value)}
      />
      <Link
        onClick={event => (!name || !room ? event.preventDefault() : null)}
        to={`/chat?name=${name}&room=${room}`}
      >
        <Button className="btn-primary" type="submit">
          Join In
        </Button>
      </Link>
    </Container>
  );
};

export default Join;
