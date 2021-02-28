import { ApolloServer } from 'apollo-server';
import { logger } from '../utils/logger';

import {
  typeDefs as EnergyTypes,
  resolvers as EnergyResolvers
} from './graphql/energyConsumption';
import {
  typeDefs as WeatherTypes,
  resolvers as WeatherResolvers
} from './graphql/weather';
import { Query } from './graphql';

export const server = new ApolloServer({
  typeDefs: [Query, EnergyTypes, WeatherTypes],
  resolvers: [EnergyResolvers, WeatherResolvers]
});

server.listen()
  .then(({ url }) => {
    logger.info({ url }, 'Server is listening');
  })
  .catch((error: Error) => logger.error({
    msg: 'Server caught error',
    error: error.message,
    stack: error.stack
  }));
