import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Box = ({ title, content, control, notification }) => {
  return (
    <div className="chat__box">
      <div>{notification.content}</div>
      <h1>{title}</h1>
      {content}
      <div>{control}</div>
    </div>
  );
};

Box.propTypes = {
  title: PropTypes.string,
  content: PropTypes.func,
  control: PropTypes.element,
  notification: PropTypes.object,
};

export default Box;
