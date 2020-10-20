import React from 'react';
import './index.scss';

//USER送發訊息的人，name該聊天室使用者名字
const ChatButton = ({ onHandleClick, className, text, icon }) => {
  const onChange = (e) => {
    // lastModified: 1598938657151
    // lastModifiedDate: Tue Sep 01 2020 13:37:37 GMT+0800 (Taipei Standard Time) {}
    // name: "sing.mp4"
    // size: 11620208
    // type: "video/mp4"
    // webkitRelativePath: ""
    const files = Array.from(e.target.files);
    let formData = new FormData();
    formData.append(0, files[0]);
    onHandleClick(formData.get(0));
  };
  return (
    <span className={`chat__button ${className}`}>
      <label className="chat__label" htmlFor="upload-photo">
        {text}
      </label>
      <input
        type="file"
        name="photo"
        id="upload-photo"
        accept="image/*,video/*,audio/*"
        onChange={onChange}
      />
      {icon && icon}
    </span>
  );
};

export default ChatButton;
