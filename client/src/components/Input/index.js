import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { ChatLeftTextFill } from 'react-bootstrap-icons';
import FileButton from '../FileButton';
import './index.scss';

const Input = ({ message, setMessage, sendMessage, sendFile, uploadFile }) => {
  const handleSendMessage = (event) => sendMessage(event);
  return (
    <form className="chat__form">
      <Row>
        <Col xs={12}>
          <input
            className="chat__input"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) =>
              event.key === 'Enter' ? setMessage(event.target.value) : null
            }
          />
        </Col>
        <Col xs={12}>
          <FileButton size="sm" type="sendFile" onHandleFile={sendFile}>
            Files
          </FileButton>
          <FileButton size="sm" type="upload" onHandleFile={uploadFile}>
            Files
          </FileButton>
          <ChatLeftTextFill
            size="32"
            onClick={message ? handleSendMessage : null}
            color={message ? 'white' : 'gray'}
          />
        </Col>
      </Row>
    </form>
  );
};
export default Input;
