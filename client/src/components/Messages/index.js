import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message';
import './index.scss';

const Messages = ({ messages, name, ...rest }) => (
  <ScrollToBottom className="chat__messages">
    {messages.map((message, index) => {
      return (
        <Message
          key={`name-${index}`}
          message={message}
          name={name}
          {...rest}
        />
      );
    })}
  </ScrollToBottom>
);

export default React.memo(Messages);
