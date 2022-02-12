import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';

import client from './api/ApiClient';

import HomePage from './components/pages/HomePage';

import AuthContext from './contexts/AuthContext';

import theme from './theme/theme';

const App = () => {
  const [hasVisited, setHasVisted] = useState<boolean>(
    localStorage.getItem('hasVisited') === 'true',
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('isAuthenticated') === 'true',
  );

  const isMobile = useMediaQuery({ query: `(max-width: 800px)` });

  const continueAsGuest = () => {
    localStorage.setItem('hasVisited', 'true');
    setHasVisted(true);
  };

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
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <AuthContext.Provider
          value={{
            continueAsGuest,
            hasVisited,
            isAuthenticated,
            login,
            logout,
          }}
        >
          <HomePage isMobile={isMobile} />
        </AuthContext.Provider>
      </ApolloProvider>
    </ChakraProvider>
  );
};

export default App;
