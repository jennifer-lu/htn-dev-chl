import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';

import HomePage from './components/pages/HomePage';

import AuthContext from './contexts/AuthContext';

import client from './api/ApiClient';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true' || false,
  );

  const login = (password: string, username: string) => {
    if (
      password === process.env.REACT_APP_PASSWORD &&
      username === process.env.REACT_APP_USERNAME
    ) {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
    } else {
      throw new Error('ERROR: Invalid username or password.');
    }
  };

  const logout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
  };

  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
          <HomePage />
        </AuthContext.Provider>
      </ApolloProvider>
    </ChakraProvider>
  );
};

export default App;
