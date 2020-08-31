import React, { useState } from 'react';
import { Upload } from 'react-bootstrap-icons';
import './index.scss';

//USER送發訊息的人，name該聊天室使用者名字
const UploadButton = ({ sendImage }) => {
  // const [files, setFiles] = useState();
  // const [uploading, setUploading] = useState(false);

  const onChange = e => {
    console.log(e.target.files);
    const files = Array.from(e.target.files)
    // setUploading(true);

    let formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })
    console.log(formData.get(0));
    sendImage(formData.get(0));
  }

  return (
    (<div className='button'>
      <label htmlFor='single'>
        <Upload />
      </label>
      <input type='file' id='single' accept="image/*,.pdf" onChange={onChange} /> 
    </div>)
  );
};

export default UploadButton;
