import React from 'react';
import './index.scss';

//USER送發訊息的人，name該聊天室使用者名字
const IconButton = ({ onHandleClick, className, name, disabled, icon }) => {
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
  const iconName = `icon-${name}`;
  return (
    <span className={`chat__icon ${className} ${disabled ? 'disabled' : ''}`}>
      <label className="chat__label" htmlFor={iconName}>
        {icon && icon}
      </label>
      <input
        className="hidden-input"
        type="file"
        name={iconName}
        id={iconName}
        accept="image/*,video/*,audio/*"
        onChange={onChange}
      />
    </span>
  );
};

export default IconButton;
