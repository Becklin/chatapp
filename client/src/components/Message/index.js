import React from 'react';
import { Image, ProgressBar } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import ReactEmoji from 'react-emoji';
import './index.scss';

//USER送發訊息的人，name該聊天室使用者名字
const Message = ({
  message: { user, text, upload, type, address, percent },
  name,
  avatarSrc,
}) => {
  console.log('最後', user, text, upload, type, address);
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  if (trimmedName === user) isSentByCurrentUser = true;
  const role = isSentByCurrentUser ? 'user' : 'friend';
  const title = role === 'user' ? trimmedName : user;
  const renderFile = ({ address, percent, type }) => {
    if (address) return <div dangerouslySetInnerHTML={{ __html: address }} />;
    if (percent && percent !== 100) return <ProgressBar now={percent} />;
    if (type) {
      switch (type) {
        case 'video/*': {
          return (
            <video width="100%" controls>
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
          break;
        }
        case 'image/*':
          return (
            <img
              className="img-thumbnail img-fluid"
              src={`data:image/png;base64, ${upload}`}
            />
          );
          break;
        default:
          return (
            <img
              className="img-thumbnail img-fluid"
              src={`data:image/png;base64, ${upload}`}
            />
          );
      }
    }
  };
  return (
    <div className={`chat-message chat-message--${role}`}>
      {role === 'friend' && (
        <h4>
          {avatarSrc ? (
            <Image src={avatarSrc} roundedCircle />
          ) : (
            <PersonCircle size={24} />
          )}
          <span>{title}</span>
        </h4>
      )}
      <div className="chat-message__body">
        {renderFile({ address, percent, type })}
        {text && (
          <p className="chat-message__body--text">{ReactEmoji.emojify(text)}</p>
        )}
      </div>
    </div>
  );
};

export default Message;
