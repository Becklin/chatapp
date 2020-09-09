import React, { useState } from 'react';
import { Upload } from 'react-bootstrap-icons';
import './index.scss';

//USER送發訊息的人，name該聊天室使用者名字
const UploadButton = ({ sendFile }) => {
  // const [files, setFiles] = useState();
  // const [uploading, setUploading] = useState(false);

  const onChange = e => {
    const files = Array.from(e.target.files);
    // lastModified: 1598938657151
    // lastModifiedDate: Tue Sep 01 2020 13:37:37 GMT+0800 (Taipei Standard Time) {}
    // name: "sing.mp4"
    // size: 11620208
    // type: "video/mp4"
    // webkitRelativePath: ""

    // lastModified: 1598850723389
    // lastModifiedDate: Mon Aug 31 2020 13:12:03 GMT+0800 (Taipei Standard Time) {}
    // name: "jessy-smith-6g06Qb4E7QM-unsplash.jpg"
    // size: 1989187
    // type: "image/jpeg"
    // webkitRelativePath: ""
    let formData = new FormData();
    formData.append(0, files[0]);
    sendFile(formData.get(0));
  };

  return (
    <div className="button">
      <input
        type="file"
        id="single"
        accept="image/*,video/*,audio/*"
        onChange={onChange}
      />
    </div>
  );
};

export default UploadButton;
