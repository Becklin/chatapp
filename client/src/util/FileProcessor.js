import ss from 'socket.io-stream';
import { dataURLtoFile } from './FileConverter';

class FileProcessor {
  constructor(file, socket) {
    console.log('檔案', file);

    this.socket = socket;
    this.file = file;
    this.name = file.name;
  }
  process(file, socket) {
    const config = {
      name: file.name,
      quality: 0.6,
      type: file.type
    };
    return convertToDataUrl(file, config)
      .then(({ readerDataUrl, config, callback }) => {
        this.base64 = readerDataUrl;
        console.log('轉換成convertToDataUrl');
        switch (config.type) {
          // case 'image/jpeg': {
          //   return minifiedDataURL(readerDataUrl, config, callback);
          // }
          case 'image/jpeg':
          case 'video/mp4': {
            return new Promise(resolve => {
              const newFile = dataURLtoFile(readerDataUrl, config, callback);
              resolve(newFile);
            });
          }
          default: {
            alert('the type is not supprted');
          }
        }
      })
      .then(data => {
        this.data = data;
        console.log("資料", data);
        return new FileProcessor(this.data, socket);
      });
  }
  send() {
    console.log('送出', this, this.file.size);
    const stream = ss.createStream();
    const blobStream = ss.createBlobReadStream(this.file); //for browser use, 本來寫法是什麼
    blobStream.pipe(stream);

    ss(this.socket).emit('sendFile', stream, {
      name: this.file.name,
      type: this.file.type,
      size: this.file.size
    });
    console.log('this.file', this.file);
  }

  upload() {
    const stream = ss.createStream();
    ss(this.socket).emit('uploadFile', stream, {
      name: this.file.name,
      type: this.file.type,
      size: this.file.size
    });
    const blobStream = ss.createBlobReadStream(this.file); //for browser use, 本來寫法是什麼
    blobStream.pipe(stream);
  }
}
const convertToDataUrl = async (file, config, callback) => {
  // 王牌文件 https://kknews.cc/zh-tw/code/e6p2ygq.html
  // 神文 https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/227679/
  /* 使用FileReader對象分三步走： 一 創建FileReader實例 */
  // var reader = new FileReader();
  /* 開始讀取指定的Blob物件或File物件中的內容. 當讀取操作完成時,readyState屬性的值會成為DONE,
    如果設定了onloadend事件處理程式,則呼叫之.
    同時,result屬性中將包含一個data: URL格式的字串以表示所讀取檔案的內容.
  */

  /* 讀取Blob或者File對象的數據內容 */
  // reader.readAsDataURL(file); // 讀取文件內容，結果用data:url的字符串形式表示

  // reader.onloadstart = function() {
  //   console.log('加載已經開始');
  // };
  // reader.onprogress = function(what) {
  //   console.log('啥', what); //注意必包
  // };
  /** 設置回調函數，這裡以讀取成功的回調函數為例： */
  const addImageProcess = (file, config, callback) => {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file); // 讀取文件內容，結果用data:url的字符串形式表示
      reader.onload = function() {
        const readerDataUrl = this.result;
        console.log('加載開始');
        resolve({ readerDataUrl, config, callback });
      };
      reader.onerror = () => reject('加载失败');
      reader.onloadend = function() {
        console.log('加載已經結束');
      };
    });
  };
  return await addImageProcess(file, config, callback);
};

// const convertToDataUrl2 = (file, config, callback) => {
//   return new Promise(resolve => {
//     // 王牌文件 https://kknews.cc/zh-tw/code/e6p2ygq.html
//     // 神文 https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/227679/
//     /* 使用FileReader對象分三步走： 一 創建FileReader實例 */
//     var reader = new FileReader();
//     /* 開始讀取指定的Blob物件或File物件中的內容. 當讀取操作完成時,readyState屬性的值會成為DONE,
//     如果設定了onloadend事件處理程式,則呼叫之.
//     同時,result屬性中將包含一個data: URL格式的字串以表示所讀取檔案的內容.
//   */

//     /* 讀取Blob或者File對象的數據內容 */
//     reader.readAsDataURL(file); // 讀取文件內容，結果用data:url的字符串形式表示

//     // reader.onloadstart = function() {
//     //   console.log('加載已經開始');
//     // };
//     // reader.onprogress = function(what) {
//     //   console.log('啥', what); //注意必包
//     // };
//     /** 設置回調函數，這裡以讀取成功的回調函數為例： */
//     reader.onload = function() {
//       const readerDataUrl = this.result;
//       console.log('加載開始');

//       resolve({ readerDataUrl, config, callback });
//     };
//     reader.onloadend = function() {
//       console.log('加載已經結束');
//     };
//   });
// };

export default FileProcessor;
