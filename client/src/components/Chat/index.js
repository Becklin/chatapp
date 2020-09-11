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
  const uploadFile = file => {
    const stream = ss.createStream();
    ss(socket).emit('uploadFile', stream, {
      name: file.name,
      type: file.type,
      size: file.size
    });
    const blobStream = ss.createBlobReadStream(file); //for browser use, 本來寫法是什麼
    let size = 0;
    // blobStream.on('data', function(chunk) {
    //   size += chunk.length;
    //   console.log(Math.floor((size / file.size) * 100) + '%');
    // });
    blobStream.pipe(stream);
  };

  const sendFile = file => {
    /* upload large file */
    // const stream = ss.createStream();
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
    const dataURLtoFile = (base64, filename) => {
      var arr = base64.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    };

    const canvasDataURL = (readerData, config, callback) => {
      return new Promise(resolve => {
        let img = new Image();
        img.src = readerData;
        img.onload = () => {
          // var that = this;
          // 預設按比例壓縮
          let w = img.width,
            h = img.height,
            scale = w / h;
          let scaledwidth = config.width || w;
          let scaledHeight = scaledwidth / scale;
          let quality = 0.7; // 預設圖片質量為0.7
          //生成canvas
          // 關鍵字
          let canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          // 建立屬性節點
          const anw = document.createAttribute('width');
          anw.nodeValue = w;
          const anh = document.createAttribute('height');
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(img, 0, 0, scaledwidth, scaledHeight);
          // 影象質量
          if (config.quality && config.quality <= 1 && config.quality > 0) {
            quality = config.quality;
          }
          /*
        我們只需要把<img>獲取到的圖片放到<canvas>裡再通過.toDataURL()方法轉化下，
        就可以得到以 base64 編碼的 dataURL。來看這個方法的語法： 
        */
          var base64 = canvas.toDataURL('image/jpeg', 'image/webp', quality);
          resolve({ base64, config, callback });
          // const resizedFile = dataURLtoFile(base64);
          // console.log('resizedFile', resizedFile);
          // // 回撥函式返回base64的值
          // callback(resizedFile); // 非同步onload只能回用回掉函數
        };
      });
    };
    /*
      以下縮小檔案
      三個引數
      file：一個是檔案(型別是圖片格式)，
      w：一個是檔案壓縮的後寬度，寬度越小，位元組越小
      objDiv：一個是容器或者回調函式
      photoCompress()
    */
    const compressImage = (file, config, callback) => {
      console.log('開始', file); //注意必包
      return new Promise(resolve => {
        // 王牌文件 https://kknews.cc/zh-tw/code/e6p2ygq.html
        // 神文 https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/227679/
        /* 使用FileReader對象分三步走： 一 創建FileReader實例 */
        var reader = new FileReader();
        /* 開始讀取指定的Blob物件或File物件中的內容. 當讀取操作完成時,readyState屬性的值會成為DONE,
        如果設定了onloadend事件處理程式,則呼叫之.
        同時,result屬性中將包含一個data: URL格式的字串以表示所讀取檔案的內容.
      */

        /* 讀取Blob或者File對象的數據內容 */
        reader.readAsDataURL(file); // 讀取文件內容，結果用data:url的字符串形式表示

        reader.onloadstart = function() {
          console.log('加載已經開始');
        };
        reader.onprogress = function(what) {
          console.log('啥', what); //注意必包
        };
        /** 設置回調函數，這裡以讀取成功的回調函數為例： */
        reader.onload = function() {
          const readerData = this.result;
          resolve({ readerData, config, callback });
        };
        reader.onloadend = function() {
          console.log('加載已經結束');
        };
      });
    };
    const config = {
      width: 200,
      quality: 0.6
    };
    // const minifiedFile = compressImage(file, config, console.log);
    /* 看完來改 https://developers.google.com/web/fundamentals/primers/async-functions?hl=zh-tw */
    compressImage(file, config)
      .then(({ readerData, config, callback }) => {
        return canvasDataURL(readerData, config, callback);
      })
      .then(({ base64, config, callback }) => {
        return dataURLtoFile(base64, config, callback);
      })
      .then(minifiedFile => {
        uploadFile(minifiedFile);
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
      />
    </Container>
  );
};

export default Chat;
