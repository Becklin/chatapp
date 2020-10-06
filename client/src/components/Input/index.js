import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { ChatLeftTextFill } from 'react-bootstrap-icons';
import FileButton from '../FileButton';
import './index.scss';

const Input = ({ message, setMessage, sendMessage, sendFile, uploadFile }) => {
  const handleSendMessage = (event) => sendMessage(event);
  return (
    <form className="chat__form">
      <input
        className="chat__input"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === 'Enter' ? setMessage(event.target.value) : null
        }
      />
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
    </form>
  );
};
export default Input;
