import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import './index.scss';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <Container className="join__wrapper">
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
        <Button block type="submit">
          Join In
        </Button>
      </Link>
    </Container>
  );
};

export default Join;
