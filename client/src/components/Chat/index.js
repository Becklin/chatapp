import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import io from 'socket.io-client';
import ss from 'socket.io-stream';
import { Container } from 'react-bootstrap';
import Input from '../Input';
import InfoBar from '../InfoBar';
import Messages from '../Messages';
import { 
  convertToDataUrl, 
  canvasDataURL, 
  dataURLtoFile, 
  emitFileToServer, 
} from '../../util/index';

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

    socket.emit('join', { name, room }, error => {
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
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });
    socket.on('file', ({ user, upload, type }) => {
      console.log('hehrehreh', user, upload, type);
      if (upload) {
        console.log('hehrehreh2', user, upload, type);
        setMessages(messages => [...messages, { user, upload, type }]);
      }
    });
  }, []);

  useEffect(() => {
    // message 包含user, text
    socket.on('roomData', ({ users }) => {
      setCounts(users.length);
    });
  }, [counts]);

  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  const sendFile = file => {
    const config = {
      name: file.name,
    };
    convertToDataUrl(file, config)
      .then(({ readerData, config, callback }) => {
        return canvasDataURL(readerData, config, callback);
      })
      .then(({ base64, config, callback }) => {
        return dataURLtoFile(base64, config, callback);
      })
      .then(minifiedFile => {
        emitFileToServer(socket, minifiedFile, "send");
      });
  };

  const uploadFile = file => {
    /* upload large file */
    const config = {
      name: file.name,
    };
    /* 看完來改 https://developers.google.com/web/fundamentals/primers/async-functions?hl=zh-tw */
    convertToDataUrl(file, config)
      .then(({ readerData, config, callback }) => {
        return canvasDataURL(readerData, config, callback);
      })
      .then(({ base64, config, callback }) => {
        return dataURLtoFile(base64, config, callback);
      })
      .then(minifiedFile => {
        emitFileToServer(socket, minifiedFile, "upload");
      });

    // ss(socket).emit('sendFile', stream, { name: file.name, data: file.type });
    // const blobStream = ss.createBlobReadStream(file); //for browser use, 本來寫法是什麼
    // let size = 0;
    // blobStream.on('data', function(chunk) {
    //   size += chunk.length;
    //   console.log(Math.floor((size / file.size) * 100) + '%');
    // });
    // blobStream.pipe(stream);
  };

  return (
    <Container fluid>
      <InfoBar room={room} counts={counts} />
      <Messages messages={messages} name={name} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        sendFile={sendFile}
        uploadFile={uploadFile}
      />
    </Container>
  );
};

export default Chat;
