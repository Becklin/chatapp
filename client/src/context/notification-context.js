import React, { useState, createContext } from 'react';

// Create Context Object
export const NotificationContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState({});

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {props.children}
    </NotificationContext.Provider>
  );
};
