import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

// Create Context Object
export const NotificationContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const NotificationContextProvider = ({children}) => {
  const [notification, setNotification] = useState({});

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationContextProvider.propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired
};

