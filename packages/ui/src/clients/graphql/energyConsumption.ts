import { gql } from '@apollo/client';

export const ENERGY_CONSUMPTION = gql`
  query FullQuery($start: String, $stop: String) {
    energyConsumption(start: $start, stop: $stop) {
      Timestamp
      Consumption
    }
    energyConsumptionAnomalies(start: $start, stop: $stop) {
      Timestamp
      Consumption
    }
    weather(start: $start, stop: $stop) {
      ... on Temperature {
        Timestamp
        AverageTemperature
      }
      ... on Humidity {
        Timestamp
        AverageHumidity
      }
    }
  }
`;

export type EnergyConsumption = {
  Timestamp: string,
  Consumption: number
};

export type Weather = {
  Timestamp: string,
  AverageTemperature: number
  AverageHumidity: number
};

