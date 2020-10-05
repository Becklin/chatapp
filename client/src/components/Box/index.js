import React from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'react-bootstrap';
import './index.scss';
import useMediaQuery from '../../util/useMediaQuery';

const Box = ({
  title,
  content,
  control,
  setHasNotification,
  hasNotification,
  notificationContent
}) => {
  const mediaQuery = useMediaQuery();

  return (
    <div className="chat__box">
      <h1>{title}</h1>
      {content}
      <div>{control}</div>
      <Toast
        onClose={() => setHasNotification(false)}
        show={hasNotification}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">FAILURE</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{notificationContent}</Toast.Body>
      </Toast>
    </div>
  );
};

Box.defaultProps = {
  setHasNotification: () => {},
  hasNotification: false
};

export default Box;
