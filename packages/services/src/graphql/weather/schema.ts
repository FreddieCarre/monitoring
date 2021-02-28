import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Temperature {
    Timestamp: String!
    AverageTemperature: Float!
  }

  type Humidity {
    Timestamp: String!
    AverageHumidity: Float!
  }

  union Weather = Temperature | Humidity

  extend type Query {
    weather(start: String, stop: String): [Weather]
  }
`;

