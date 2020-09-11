import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import io from 'socket.io-client';
import ss from 'socket.io-stream';
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
      if (upload) {
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
    const stream = ss.createStream();

    /* 以下上傳原始檔案 */
    // ss(socket).emit('uploadFile', stream, {
    //   name: file.name,
    //   type: file.type,
    //   size: file.size
    // });
    // const blobStream = ss.createBlobReadStream(file); //for browser use, 本來寫法是什麼
    // let size = 0;
    // blobStream.on('data', function(chunk) {
    //   size += chunk.length;
    //   console.log(Math.floor((size / file.size) * 100) + '%');
    // });
    // blobStream.pipe(stream);

    const canvasDataURL = (path, obj, callback) => {
      var img = new Image();
      img.src = path;
      img.onload = function() {
        var that = this;
        // 預設按比例壓縮
        var w = that.width,
          h = that.height,
          scale = w / h;
        w = obj.width || w;
        h = obj.height || w / scale;
        var quality = 0.7; // 預設圖片質量為0.7
        //生成canvas
        // 關鍵字
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 建立屬性節點
        var anw = document.createAttribute('width');
        anw.nodeValue = w;
        var anh = document.createAttribute('height');
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 影象質量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality;
        }
        // quality值越小，所繪製出的影象越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回撥函式返回base64的值
        callback(base64);
      };
    };
    /*
      以下縮小檔案
      三個引數
      file：一個是檔案(型別是圖片格式)，
      w：一個是檔案壓縮的後寬度，寬度越小，位元組越小
      objDiv：一個是容器或者回調函式
      photoCompress()
    */
    const compressImage = (file, w, objDiv) => {
      var ready = new FileReader();
      /*開始讀取指定的Blob物件或File物件中的內容. 當讀取操作完成時,readyState屬性的值會成為DONE,如果設定了onloadend事件處理程式,則呼叫之.同時,result屬性中將包含一個data: URL格式的字串以表示所讀取檔案的內容.*/
      ready.readAsDataURL(file);
      ready.onload = function() {
        var re = this.result;
        canvasDataURL(re, w, objDiv);
      };
    };
    compressImage(file, 200, console.log);
    //https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/Camera_API

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
      />
    </Container>
  );
};

export default Chat;
