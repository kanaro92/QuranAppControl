import React, {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const NotificationsProvider = ({children}) => {
  const [notifications, setNotifications] = useState(null);
  const [notification, setNotification] = useState(null);



  return (
    <AuthContext.Provider value={{notifications, notification}}>
      {children}
    </AuthContext.Provider>
  );
};
