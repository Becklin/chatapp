import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import io from 'socket.io-client';
import { Container } from 'react-bootstrap';
import Input from '../Input';
import InfoBar from '../InfoBar';
import Messages from '../Messages';
let socket;

const Chat = () => {
  let { search } = useLocation();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [counts, setCounts] = useState(0);
  const ENDPOINT = 'localhost:5000';


  useEffect(() => {
    const { name, room } = qs.parse(search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, search]);

  useEffect(() => {
    // message 包含user, text, 這邊效能很像有問題
    socket.on('message', message => {
      console.log('message', message);
      // setMessages([...messages, message]);
      setMessages(messages => [ ...messages, message ]);
    });
  }, []);

  //自己加的
  useEffect(() => {
    // message 包含user, text
    socket.on('roomData', ({users}) => {
      setCounts(users.length);
    });
  }, [counts]);


  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };
  console.log('重複');
  return (
    <Container fluid>
      <InfoBar room={room} counts={counts} />
      <Messages messages={messages} name={name} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </Container>
  );
};

export default Chat;
