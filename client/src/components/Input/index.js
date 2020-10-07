import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import {
  ChatRightTextFill,
  CloudUploadFill,
  Image,
} from 'react-bootstrap-icons';
import IconButton from '../IconButton';
import './index.scss';

const Input = ({ message, setMessage, sendMessage, sendFile, uploadFile }) => {
  const handleSendMessage = (event) => sendMessage(event);
  return (
    <form className="chat__form">
      <textarea
        className="chat__message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === 'Enter' ? setMessage(event.target.value) : null
        }
      />
      <div className="chat__controls">
        <IconButton
          className="chat__flex"
          type="file"
          onHandleClick={sendFile}
          icon={<Image />}
          text="files"
        />
        <IconButton
          className="chat__flex"
          type="file"
          onHandleClick={uploadFile}
          icon={<CloudUploadFill />}
          text="upload"
        />
        <ChatRightTextFill
          className="chat__flex"
          size="32"
          onClick={message ? handleSendMessage : null}
          color={message ? 'white' : 'gray'}
        />
      </div>
    </form>
  );
};
export default Input;
