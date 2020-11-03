import React, { useState, createContext } from 'react';

// Create Context Object
export const StatusContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const StatusContextProvider = props => {
  const [status, setStatus] = useState(0);

  return (
    <StatusContext.Provider value={[status, setStatus]}>
      {props.children}
    </StatusContext.Provider>
  );
};
