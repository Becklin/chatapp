export function dataURLtoFile(base64, config) {
  var arr = base64.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], config.name, { type: mime });
}

export function minifiedDataURL(readerDataUrl, config, callback) {
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
    };
  });
}
