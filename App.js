import * as React from 'react';
import {AuthProvider} from './src/context/AuthContext';
import AppNav from './src/navigations/AppNav';

export default function App() {
  // isAuthenticated = is...
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
