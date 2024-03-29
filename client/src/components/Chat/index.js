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
  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [counts, setCounts] = useState(0);

  let ENDPOINT = 'localhost:5000';
  if (process.env.NODE_ENV === 'production') {
    ENDPOINT = 'https://dailytalk.herokuapp.com';
  }
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    console.log('development');
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
    const getMessage = (element, id) => element.id === id;
    const addMessage = ({ messages, id, upload = '', user, type, percent }) => {
      return [
        ...messages,
        {
          id,
          upload,
          user,
          type,
          percent,
        },
      ];
    };
    const updateMessage = (index, messages, payload) => {
      messages[index] = {
        ...messages[index],
        ...payload,
      };
      return [...messages];
    };
    socket.on('message', (message) =>
      setMessages((messages) => {
        return [...messages, message];
      })
    );
    socket.on('percent', (amount, { id, user, type }) => {
      setMessages((messages) => {
        const messageIndex = messages.findIndex((message) =>
          getMessage(message, id)
        );
        if (messageIndex < 0) {
          const config = {
            messages,
            id,
            percent: amount,
            user,
            type,
          };
          return addMessage(config);
        } else {
          messages[messageIndex].percent = amount;
          return [...messages];
        }
      });
    });
    socket.on('file', ({ user, upload, type, id }) => {
      if (upload) {
        setMessages((messages) => {
          const messageIndex = messages.findIndex((message) =>
            getMessage(message, id)
          );
          const payload = {
            id,
            user,
            upload,
            type,
          };
          return updateMessage(messageIndex, messages, payload);
        });
      }
    });
  }, []);

  useEffect(() => {
    socket.on('roomData', ({ users }) => {
      setCounts(users.length);
    });
  }, [counts]);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(message);
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  const sendFile = (file) => {
    /* build => 非同步promise處裡檔案 */
    FileProcessor.process(file, socket).then((minifiedFileProcessor) => {
      minifiedFileProcessor.send();
    });
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
