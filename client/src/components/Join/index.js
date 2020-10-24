import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '../Box';
import { Button, Form } from 'react-bootstrap';
import './index.scss';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [avatar, setAvatar] = useState();
  const handleChange = (event) => {
    setAvatar(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <Box
      title="Join"
      content={
        <Form>
          <input type="file" onChange={handleChange} />
          <img width="50px" src={avatar} />
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Label>Room</Form.Label>
            <Form.Control
              type="text"
              placeholder="Room"
              onChange={(e) => setRoom(e.target.value)}
            />
          </Form.Group>
        </Form>
      }
      control={
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <Button block type="submit">
            Join In
          </Button>
        </Link>
      }
    />
  );
};

export default Join;
