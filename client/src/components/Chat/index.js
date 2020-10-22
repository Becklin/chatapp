import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import io from 'socket.io-client';
// import { Container } from 'react-bootstrap';
import Input from '../Input';
import InfoBar from '../InfoBar';
import Messages from '../Messages';
import FileProcessor from '../../util/FileProcessor';
import { v4 as uuid } from 'uuid';

let socket;

const Chat = () => {
  let { search } = useLocation();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [counts, setCounts] = useState(0);

  let ENDPOINT = 'localhost:5000';
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
      console.log(messages);
      setMessages((messages) => {
        console.log('messages', messages);

        return [...messages, message];
      });
    });
    let firstProgress = true;
    socket.on('percent', (amount) => {
      if (firstProgress) {
        // console.log('第一次');
        setMessages((messages) => [
          ...messages,
          {
            id: uuid(),
            hasUploaded: false,
            percent: amount,
          },
        ]);
        firstProgress = false;
      } else {
        setMessages((messages) => {
          let lastMessage = [...messages].pop();
          lastMessage.percent = amount;
          return [...messages, lastMessage];
        });
      }
      console.log('NOT fiest');
    });
    socket.on('file', ({ user, upload, type }) => {
      if (upload) {
        const id = uuid();
        setMessages((messages) => [
          ...messages,
          { id, user, upload, type, hasUploaded: true },
        ]);
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
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(null));
    }
  };

  const sendFile = (file) => {
    /* build => 非同步promise處裡檔案 */
    // console.log('sendFile', file);
    FileProcessor.process(file, socket).then((minifiedFileProcessor) => {
      // console.log('minifiedFileProcessor.send()', Date());
      minifiedFileProcessor.send();
    });
  };

  const uploadFile = (file) => {
    FileProcessor.process(file, socket).then((originalFileProcessor) =>
      originalFileProcessor.upload()
    );
  };
  console.log('單向', messages);
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
