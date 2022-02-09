import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.hackthenorth.com/v3/graphql',
  cache: new InMemoryCache(),
});

export default client;
