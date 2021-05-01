import React from 'react';
import PropTypes from 'prop-types';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message';
import './index.scss';

const Messages = ({ messages, name, ...rest }) => (
  <ScrollToBottom className="chat__messages">
    {messages.map((message) => {
      return (
        <Message
          key={`name-${message.id}`}
          message={message}
          name={name}
          {...rest}
        />
      );
    })}
  </ScrollToBottom>
);

Messages.propTypes = {
  messages: PropTypes.any,
  name: PropTypes.string,
}

export default React.memo(Messages);
