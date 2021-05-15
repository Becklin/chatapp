import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NotificationContext } from '../../context/notification-context';
import './index.scss';

const Head = ({ children }) => {
  const [notification] = useContext(NotificationContext);
  return (
    <section className="chat__head">
      <div
        className={`chat__notification chat__notification${
          notification.status === 'Error' ? '--active' : ''
        }`}
      >
        {notification.content}
      </div>
      <div className="chat__head-burgur">{children}</div>
    </section>
  );
};

Head.propTypes = {
  children: PropTypes.any,
}

export default Head;
