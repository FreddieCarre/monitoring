import { gql } from 'apollo-server';

export const typeDefs = gql`
  type EnergyConsumption {
    Consumption: Float!
    Timestamp: String!
  }

  extend type Query {
    energyConsumption: [EnergyConsumption]
    energyConsumptionAnomalies: [EnergyConsumption]
  }
`;
