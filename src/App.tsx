import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';

import client from './api/ApiClient';

import HomePage from './components/pages/HomePage';

import AuthContext from './contexts/AuthContext';
import ColorModeContext from './contexts/ColorModeContext';
import DeviceContext from './contexts/DeviceContext';

import darkTheme from './theme/darkTheme';
import lightTheme from './theme/lightTheme';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('isAuthenticated') === 'true',
  );
  const [isDark, setIsDark] = useState<boolean>(
    localStorage.getItem('isDark') === 'true',
  );

  const isMobile = useMediaQuery({ query: `(max-width: 800px)` });

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

  const toggleIsDark = () => {
    localStorage.setItem('isDark', isDark ? 'false' : 'true');
    setIsDark(!isDark);
  };

  return (
    <ChakraProvider theme={isDark ? darkTheme : lightTheme}>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
          <ColorModeContext.Provider value={{ isDark, toggleIsDark }}>
            <DeviceContext.Provider value={{ isMobile }}>
              <HomePage />
            </DeviceContext.Provider>
          </ColorModeContext.Provider>
        </AuthContext.Provider>
      </ApolloProvider>
    </ChakraProvider>
  );
};

export default App;
