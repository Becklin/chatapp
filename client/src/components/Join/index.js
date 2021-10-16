import React, { useState } from 'react';
import Box from '../Box';
import { Form } from 'react-bootstrap';
import LinkWithIcon from '../LinkWithIcon';

import './index.scss';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const isComplete = name && room;

  return (
    <Box
      title="Join"
      content={
        <Form>
          {/* <FileInputStyled type="file" onChange={handleChange} />
          <img width="50px" src={avatar} /> */}
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
        <LinkWithIcon
          primary
          disabled={isComplete}
          width="90%"
          to={`/chat?name=${name}&room=${room}`}
        >
          Join In
        </LinkWithIcon>
      }
    />
  );
};

export default Join;
