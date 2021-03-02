import { ApolloClient, InMemoryCache } from '@apollo/client';

const {
  REACT_APP_APOLLO_HOST: APOLLO_HOST = 'localhost',
  REACT_APP_APOLLO_PORT: APOLLO_PORT = 4000,
} = process.env;

export const client = new ApolloClient({
  uri: `http://${APOLLO_HOST}:${APOLLO_PORT}`,
  cache: new InMemoryCache()
});
