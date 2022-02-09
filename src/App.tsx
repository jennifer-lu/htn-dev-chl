import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';

import HomePage from './components/pages/HomePage';

import client from './api/ApiClient';

const App = () => {
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <HomePage />
      </ApolloProvider>
    </ChakraProvider>
  );
};

export default App;
