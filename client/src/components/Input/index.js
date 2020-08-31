import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import UploadButton from '../UploadButton';
import './index.scss';

const Input = ({ message, setMessage, sendMessage, sendImage }) => (
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
        size="sm"
        onClick={event => sendMessage(event)}
        >
          send
        </Button>
        <UploadButton
          size="sm"
          sendImage={sendImage}
          >
          images
        </UploadButton>
      </Col>
    </Row>
  </form>
);
export default Input;
