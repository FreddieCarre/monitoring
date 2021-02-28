import { gql } from '@apollo/client';

export const ENERGY_CONSUMPTION = gql`
  query FullQuery {
    energyConsumption {
      Timestamp
      Consumption
    }
    energyConsumptionAnomalies {
      Timestamp
      Consumption
    }
    weather {
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

export type GraphData = {
  energyConsumption: EnergyConsumption[]
  energyConsumptionAnomalies: EnergyConsumption[]
  weather: Weather[]
};

