import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import { Page } from './components/Page';

import { client } from './client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Page />
  </ApolloProvider>,
  document.getElementById('root')
);
