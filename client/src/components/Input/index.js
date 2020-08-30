import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import './index.scss';

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="chat__form">
    <Row>
      <Col xs={8}>
        <input
          className="chat__input"
          value={message}
          onChange={event => setMessage(event.target.value)}
          onKeyPress={event =>
            event.key === 'Enter' ? setMessage(event.target.value) : null
          }
        />
      </Col>
      <Col xs={4}>
        <Button
        disabled={!message}
        size="lg"
        onClick={event => sendMessage(event)}
        >
          send
        </Button>
      </Col>
    </Row>
  </form>
);
export default Input;
