import {
  EnergyConsumption,
  Weather
} from './clients/graphql/energyConsumption';

export type GraphData = {
  energyConsumption?: EnergyConsumption[],
  energyConsumptionAnomalies?: EnergyConsumption[],
  weather?: Weather[]
};
export type DataStateProps = {
  data?: GraphData
};

