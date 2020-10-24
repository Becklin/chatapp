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
  console.log('最後', user, text);
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  if (trimmedName === user) isSentByCurrentUser = true;
  const role = isSentByCurrentUser ? 'user' : 'friend';
  const title = role === 'user' ? trimmedName : user;
  const renderProgress = (percent) => {
    if (percent > 0 && percent < 100)
      return (
        <>
          loading...
          <ProgressBar now={percent} animated />
        </>
      );
  };

  const renderFile = ({ address, type, upload }) => {
    if (address) return <div dangerouslySetInnerHTML={{ __html: address }} />;
    if (type && upload) {
      switch (type) {
        case 'video/mp4': {
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
        {renderProgress(percent)}
        {renderFile({ address, percent, type, upload })}
        {text && (
          <p className="chat-message__body--text">{ReactEmoji.emojify(text)}</p>
        )}
      </div>
    </div>
  );
};

export default Message;
