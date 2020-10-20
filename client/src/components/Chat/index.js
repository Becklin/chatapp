import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import io from 'socket.io-client';
// import { Container } from 'react-bootstrap';
import Input from '../Input';
import InfoBar from '../InfoBar';
import Messages from '../Messages';
import FileProcessor from '../../util/FileProcessor';

let socket;

const Chat = () => {
  let { search } = useLocation();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [counts, setCounts] = useState(0);

  let ENDPOINT = 'localhost:5000';
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'production') {
    ENDPOINT = 'https://freshtalk.herokuapp.com';
  }

  useEffect(() => {
    const { name, room } = qs.parse(search);
    socket = io(ENDPOINT, {
      path: '/socket.io',
      transports: ['websocket'],
      secure: true,
    });
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, search]);

  useEffect(() => {
    // message 包含user, text
    socket.on('message', (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message]);
    });
    socket.on('percent', (amount) => {
      console.log('百分之', amount);
    });
    socket.on('file', ({ user, upload, type }) => {
      console.log(user, type);
      if (upload) {
        setMessages((messages) => [...messages, { user, upload, type }]);
      }
    });
  }, []);

  useEffect(() => {
    // message 包含user, text
    socket.on('roomData', ({ users }) => {
      setCounts(users.length);
    });
  }, [counts]);

  const sendMessage = (event) => {
    console.log();

    event.preventDefault();
    if (message) {
      console.log('message', message);
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  const sendFile = (file) => {
    /* build => 非同步promise處裡檔案 */
    console.log('sendFile', file);
    FileProcessor.process(file, socket).then((minifiedFileProcessor) =>
      minifiedFileProcessor.send()
    );
  };

  const uploadFile = (file) => {
    FileProcessor.process(file, socket).then((originalFileProcessor) =>
      originalFileProcessor.upload()
    );
  };

  return (
    <>
      <InfoBar room={room} counts={counts} />
      <Messages messages={messages} name={name} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        sendFile={sendFile}
        uploadFile={uploadFile}
      />
    </>
  );
};

export default Chat;
