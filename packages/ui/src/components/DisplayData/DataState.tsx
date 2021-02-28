import React, { useEffect, useState } from 'react';

import { Graph } from '../Graph';

import {
  EnergyConsumption,
  Weather
} from '../../graphql/energyConsumption';

type DataStateProps = {
  data?: {
    energyConsumption?: EnergyConsumption[],
    energyConsumptionAnomalies?: EnergyConsumption[],
    weather?: Weather[]
  }
};
export const DataState: React.FC<DataStateProps> = ({ data }) => {
  const [energyConsumption, setEnergyConsumption] = useState<Highcharts.SeriesAreaDataOptions[]>();
  const [energyAnomalies, setEnergyAnomalies] = useState<Highcharts.SeriesAreaDataOptions[]>();
  const [temperatureData, setTemperatureData] = useState<Highcharts.SeriesAreaDataOptions[]>();
  const [humidityData, setHumidityData] = useState<Highcharts.SeriesAreaDataOptions[]>();

  useEffect(() => {
    if(data && data.energyConsumption) {
      const seriesData: Highcharts.SeriesAreaDataOptions[] = data.energyConsumption.map(v => {
        return [
          new Date(v.Timestamp).getTime(),
          v.Consumption
        ] as Highcharts.SeriesAreaDataOptions;
      });

      setEnergyConsumption(seriesData);
    }
  }, [data]);

  useEffect(() => {
    if(data && data.energyConsumptionAnomalies) {
      const seriesData: Highcharts.SeriesAreaDataOptions[] = data.energyConsumptionAnomalies.map(v => {
        return [
          new Date(v.Timestamp).getTime(),
          v.Consumption
        ] as Highcharts.SeriesAreaDataOptions;
      });

      setEnergyAnomalies(seriesData);
    }
  }, [data]);

  useEffect(() => {
    if(data && data.weather) {
      const temperatureData: Highcharts.SeriesAreaDataOptions[] = data.weather.map(v => {
        return [
          new Date(v.Timestamp).getTime(),
          v.AverageTemperature
        ] as Highcharts.SeriesAreaDataOptions;
      });

      setTemperatureData(temperatureData);

      const humidityData: Highcharts.SeriesAreaDataOptions[] = data.weather.map(v => {
        return [
          new Date(v.Timestamp).getTime(),
          v.AverageHumidity
        ] as Highcharts.SeriesAreaDataOptions;
      });

      setHumidityData(humidityData);
    }
  }, [data]);

  return <>
      <Graph
        energyConsumption={energyConsumption}
        energyAnomalies={energyAnomalies}
        temperatureData={temperatureData}
        humidityData={humidityData}
      />
    </>;
};
