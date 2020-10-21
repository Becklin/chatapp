import ss from 'socket.io-stream';

class FileProcessor {
  constructor(file, socket, callback) {
    this.socket = socket;
    this.file = file;
    this.name = file.name;
  }
  static process(file, socket) {
    const config = {
      name: file.name,
      quality: 0.6,
      type: file.type,
    };
    return convertToDataUrl(file, config)
      .then(({ readerDataUrl, config, callback }) => {
        this.base64 = readerDataUrl;
        switch (config.type) {
          case 'image/jpeg': {
            return minifiedDataURL(readerDataUrl, config, callback);
          }
          case 'video/mp4': {
            return new Promise((resolve) => {
              const newFile = dataURLtoFile(readerDataUrl, config, callback);
              resolve(newFile);
            });
          }
          default: {
            alert('the type is not supprted');
          }
        }
      })
      .then((data) => {
        this.data = data;
        console.log('跑到這裡', this.data);
        return new FileProcessor(this.data, socket);
      });
  }
  send() {
    const stream = ss.createStream();
    const blobStream = ss.createBlobReadStream(this.file); //for browser use, 本來寫法是什麼
    blobStream.pipe(stream);

    ss(this.socket).emit('sendFile', stream, {
      name: this.file.name,
      type: this.file.type,
      size: this.file.size,
    });
    console.log('this.file', this.file);
    // const totalSize = this.file.size;
    // let size = 0;
    // blobStream.on('data', function (chunk) {
    //   size += chunk.length;
    //   console.log('totalSize', totalSize);
    //   console.log(Math.floor((size / totalSize) * 100) + '%');
    // });
    // console.log('完成Blob', Date());
  }

  upload() {
    const stream = ss.createStream();
    ss(this.socket).emit('uploadFile', stream, {
      name: this.file.name,
      type: this.file.type,
      size: this.file.size,
    });
    const blobStream = ss.createBlobReadStream(this.file); //for browser use, 本來寫法是什麼
    // let size = 0;
    // blobStream.on('data', function(chunk) {
    //   size += chunk.length;
    //   console.log(Math.floor((size / file.size) * 100) + '%');
    // });
    blobStream.pipe(stream);
  }
}

const convertToDataUrl = (file, config, callback) => {
  return new Promise((resolve) => {
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

    // reader.onloadstart = function() {
    //   console.log('加載已經開始');
    // };
    // reader.onprogress = function(what) {
    //   console.log('啥', what); //注意必包
    // };
    /** 設置回調函數，這裡以讀取成功的回調函數為例： */
    reader.onload = function () {
      const readerDataUrl = this.result;
      resolve({ readerDataUrl, config, callback });
    };
    reader.onloadend = function () {
      console.log('加載已經結束');
    };
  });
};

const minifiedDataURL = (readerDataUrl, config, callback) => {
  return new Promise((resolve) => {
    // let video = document.createElement('video');
    // video.setAttribute('src', readerDataUrl);
    let img = new Image();
    // 要從這裡讀取到type
    img.src = readerDataUrl;
    img.onload = () => {
      // var that = this;
      // 預設按比例壓縮
      let width = img.width,
        height = img.height,
        scale = width / height;
      const resizedWidth = 400;
      let resizedHeight = resizedWidth / scale;
      let quality = 0.7; // 預設圖片質量為0.7
      //生成canvas
      // 關鍵字
      let canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // 建立屬性節點
      const anw = document.createAttribute('width');
      anw.nodeValue = resizedWidth;
      const anh = document.createAttribute('height');
      anh.nodeValue = resizedHeight;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(img, 0, 0, resizedWidth, resizedHeight);
      // 影象質量
      if (config.quality && config.quality <= 1 && config.quality > 0) {
        quality = config.quality;
      }
      /*
        我們只需要把<img>獲取到的圖片放到<canvas>裡再通過.toDataURL()方法轉化下，
        就可以得到以 base64 編碼的 dataURL。來看這個方法的語法： 
        */
      var base64 = canvas.toDataURL('image/jpeg', 'image/webp', quality);
      const newFile = dataURLtoFile(base64, config, callback);
      resolve(newFile);
      // const resizedFile = dataURLtoFile(base64);
      // console.log('resizedFile', resizedFile);
      // // 回撥函式返回base64的值
      // callback(resizedFile); // 非同步onload只能回用回掉函數
    };
  });
};

const dataURLtoFile = (base64, config, callback) => {
  var arr = base64.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], config.name, { type: mime });
};
/*
const emitFileToServer = (socket, file, action) => {
  const stream = ss.createStream();
  console.log("file", file);
  console.log("action", action);

  if (action === "send") {
    ss(socket).emit("sendFile", stream, {
      name: file.name,
      type: file.type,
      size: file.size
    });
  }
  if (action === "upload") {
    ss(socket).emit("uploadFile", stream, {
      name: file.name,
      type: file.type,
      size: file.size
    });
  }
  const blobStream = ss.createBlobReadStream(file); //for browser use, 本來寫法是什麼
  let size = 0;
  // blobStream.on('data', function(chunk) {
  //   size += chunk.length;
  //   console.log(Math.floor((size / file.size) * 100) + '%');
  // });
  blobStream.pipe(stream);
};
*/
export default FileProcessor;
