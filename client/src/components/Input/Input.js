import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="chat__form">
    <Row>
      <Col sm={8}>
        <input
          value={message}
          onChange={event => setMessage(event.target.value)}
          onKeyPress={event =>
            event.key === 'Enter' ? setMessage(event) : null
          }
        />
      </Col>
      <Col sm={4}>
        <button onClick={event => sendMessage(event)}>send</button>
      </Col>
    </Row>
  </form>
);
export default Input;
