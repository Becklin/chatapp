import React from 'react';
// import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ChatTextFill, CloudUploadFill, Image } from 'react-bootstrap-icons';
import IconButton from '../IconButton';
import './index.scss';

const Input = ({
  message = '',
  setMessage,
  sendMessage,
  sendFile,
  uploadFile,
}) => {
  const handleSendMessage = (event) => {
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
          disabled={message}
          className="chat__flex"
          type="file"
          onHandleClick={sendFile}
          icon={<Image />}
          name="files"
        />
        <IconButton
          disabled={message}
          className="chat__flex"
          type="file"
          onHandleClick={uploadFile}
          icon={<CloudUploadFill />}
          name="upload"
        />
        <ChatTextFill
          className="chat__flex"
          size="32"
          onClick={message ? handleSendMessage : null}
          color={message ? 'darkslategray' : '#e3e3e3'}
        />
      </div>
    </form>
  );
};

Input.propTypes = {
  message: PropTypes.string,
  setMessage: PropTypes.func,
  sendMessage: PropTypes.func,
  sendFile: PropTypes.func,
  uploadFile: PropTypes.func,
}

export default Input;
