import React from 'react';
import { Image } from 'react-bootstrap';
import { PersonCircle, SimFill } from 'react-bootstrap-icons';
import ReactEmoji from 'react-emoji';
import './index.scss';

//USER送發訊息的人，name該聊天室使用者名字
const Message = ({
  message: { user, text, upload, type, address },
  name,
  avatarSrc
}) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  if (trimmedName === user) isSentByCurrentUser = true;
  const role = isSentByCurrentUser ? 'user' : 'friend';
  const title = role === 'user' ? trimmedName : user;
  const renderFile = (address, type) => {
    if (address) return <div dangerouslySetInnerHTML={{ __html: address }} />;
    if (type) {
      switch (type) {
        case 'video/mp4':
        case 'video/quicktime':

          return (
            <video controls>
              <source
                src={`data:image/png;base64, ${upload}`}
                type="video/mp4"
              />
              <source
                src={`data:image/png;base64, ${upload}`}
                type="video/ogg"
              />
              Your browser does not support the video tag.
            </video>
          );
        case 'image/jpeg':
        case 'image/png':
          return (
            <img
              className="img-thumbnail img-fluid"
              src={`data:image/png;base64, ${upload}`}
            />
          );
        default:
          return;
      }
    }
    return ReactEmoji.emojify(text);
  };
  return (
    <div className="chat-message__wrapper">
      <div className={`chat-message__userInfo chat-message__userInfo--${role}`}>
        <span className="chat-message__avatar">
          {avatarSrc ? (
            <Image src={avatarSrc} roundedCircle />
          ) : (
            <PersonCircle size={24} />
          )}
        </span>
        <span>{title}</span>
        <div className={`chat-message__content chat-message__content--${role}`}>
          {renderFile(address, type)}
        </div>
      </div>
    </div>
  );
};

export default Message;
