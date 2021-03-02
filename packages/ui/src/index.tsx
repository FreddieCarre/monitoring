import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import './index.css';
import { Page } from './components/Page';
import { client } from './clients/graphql/client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Page />
  </ApolloProvider>,
  document.getElementById('root')
);
