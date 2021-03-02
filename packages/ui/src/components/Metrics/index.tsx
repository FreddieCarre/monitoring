import React from 'react';

import { useGetSeriesDataMean } from '../../hooks/useGetSeriesDataMean';

type MetricsProps = {
  energyConsumption?: Highcharts.SeriesAreaDataOptions[]
  temperature?: Highcharts.SeriesAreaDataOptions[],
  humidity?: Highcharts.SeriesAreaDataOptions[]
};
export const Metrics: React.FC<MetricsProps> = ({
  energyConsumption = [],
  temperature = [],
  humidity = []
}) =>  (
  <div id="metrics-container">
    <MetricCard name="Average Consumption" id="average-consumption" data={energyConsumption} />
    <MetricCard name="Average Temperature" id="average-temperature" data={temperature} />
    <MetricCard name="Average Humidity" id="average-humidity" data={humidity} />
  </div>
);

type CardProps = {
  data: Highcharts.SeriesAreaDataOptions[],
  name: string,
  id: string
}
export const MetricCard: React.FC<CardProps> = ({
  data =[],
  name,
  id
}) => {
  const mean = useGetSeriesDataMean(data);

  return (
    <div>
      <h1>{name}</h1>
      <p data-testid={id}>{mean}</p>
    </div>
  );
};
