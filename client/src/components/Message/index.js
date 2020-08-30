import React from 'react';
import { Image } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import ReactEmoji from 'react-emoji';
import './index.scss';

//USER送發訊息的人，name該聊天室使用者名字
const Message = ({message: { user, text }, name, avatarSrc }) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if (trimmedName === user) isSentByCurrentUser = true;
    const role = isSentByCurrentUser ? 'user':'friend';
    const title = role === "user" ? trimmedName : user;
    return (
        <div className="chat-message__wrapper">
            <div className={`chat-message__userInfo chat-message__userInfo--${role}`}>
                <span className="chat-message__avatar">{avatarSrc ? <Image src={avatarSrc} roundedCircle /> : <PersonCircle size={24}/>}</span>
                <h4>{title}</h4>
            </div>
            <div className={`chat-message__content chat-message__content--${role}`}>
                {ReactEmoji.emojify(text)}
           </div>
        </div>
    )
};

export default Message;