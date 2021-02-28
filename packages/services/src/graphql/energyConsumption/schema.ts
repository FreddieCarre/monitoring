import { gql } from 'apollo-server';

export const typeDefs = gql`
  type EnergyConsumption {
    Consumption: Float!
    Timestamp: String!
  }

  extend type Query {
    energyConsumption(start: String, stop: String): [EnergyConsumption]
    energyConsumptionAnomalies(start: String, stop: String): [EnergyConsumption]
  }
`;
