import React, { useState } from 'react';
import Box from '../Box';
import { Form } from 'react-bootstrap';
import styled from '@emotion/styled';
import LinkWithIcon from "../LinkWithIcon";
import { vars } from '../../variables';

import './index.scss';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [avatar, setAvatar] = useState();
  const handleChange = (event) => {
    setAvatar(URL.createObjectURL(event.target.files[0]));
  };
  const isComplete = name && room;

  const FileInputStyled = styled('input')`
    color: transparent;
    position:relative;
    height: 50px;
    margin-left: -140px;
    margin-top: 16px;
    margin-bottom: 16px;
    &::before {
      content: 'Select some files';
      display: inline-block;
      background: ${vars.BorderDecoColor};
      color: ${vars.ChatFontColor};;
      border-radius: 3px;
      padding: 0px 8px;
      outline: none;
      cursor: pointer;
      width: 140px;
      height: 50px;
      position: absolute;
      left: 140px;
      line-height: 50px;
    }
  }
  `
  return (
    <Box
      title="Join"
      content={
        <Form>
          <FileInputStyled type="file" onChange={handleChange} />
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
