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
  const handleSendMessage = (event) => {
    console.log('dddd', event.target.value);
    sendMessage(event);
  };
  return (
    <form className="chat__form">
      <textarea
        className="chat__message"
        placeholder="write some message..."
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
          color={message ? 'darkslategray' : '#e3e3e3'}
        />
      </div>
    </form>
  );
};
export default Input;
