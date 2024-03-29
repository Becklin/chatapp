import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

//USER送發訊息的人，name該聊天室使用者名字
const ChatButton = ({ onHandleClick, className, text, icon }) => {
  const onChange = (e) => {
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

ChatButton.propTypes = {
  onHandleClick: PropTypes.func,
  className: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.element,
};

export default ChatButton;
