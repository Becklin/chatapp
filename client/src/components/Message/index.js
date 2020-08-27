import React from 'react';
import ReactEmoji from 'react-emoji';
import './index.scss';

const Message = ({message: { user, text }, name}) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if (trimmedName === user) {
        isSentByCurrentUser = true;
    }
    return (
        isSentByCurrentUser
        ? (
            <div>
                <p>{trimmedName}</p>
                <div>
                    {ReactEmoji.emojify(text)}
                </div>
            </div>
        ) : (
            <div>
                <p>{trimmedName}</p>
                <div>
                    {ReactEmoji.emojify(text)}
                </div>
            </div>
        )
    )
};

export default Message;