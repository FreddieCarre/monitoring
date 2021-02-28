import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import {
  ENERGY_CONSUMPTION,
  GraphData
} from '../../graphql/energyConsumption';

export const GraphWrapper = () => {
  const { loading, error, data } = useQuery<GraphData>(ENERGY_CONSUMPTION, {
    pollInterval: 10_000
  });

  const [energyConsumption, setEnergyConsumption] = useState<Highcharts.SeriesAreaDataOptions[]>();
  const [energyAnomalies, setEnergyAnomalies] = useState<Highcharts.SeriesAreaDataOptions[]>();
  const [weatherData, setWeatherData] = useState<Highcharts.SeriesAreaDataOptions[]>();

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
      const seriesData: Highcharts.SeriesAreaDataOptions[] = data.weather.map(v => {
        return [
          new Date(v.Timestamp).getTime(),
          v.AverageHumidity,
          v.AverageTemperature
        ] as Highcharts.SeriesAreaDataOptions;
      });

      setWeatherData(seriesData);
    }
  }, [data]);


  if (error) {
    console.log(error);

    return <p>Error :( </p>;
  };

  const chartState: Highcharts.Options = {
    title: {
      text: 'Energy Consumption'
    },
    xAxis: {
      type: 'datetime'
    },
    tooltip: {
      split: true
    },
    series: [
      {
        type: 'line',
        name: 'Energy Consumption',
        data: energyConsumption
      },
      {
        type: 'line',
        name: 'Energy Consumption Anomalies',
        data: energyAnomalies,
        color: 'red'
      },
      {
        type: 'line',
        name: 'Weather',
        data: weatherData
      }

    ],
    legend: {
      enabled: true
    }
  };

  return <Graph loading={loading} chartState={chartState} />;
};

type GraphProps = {
  loading: boolean,
  chartState: Highcharts.Options
};
const Graph: React.FC<GraphProps> = ({ loading, chartState }) => {
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartState}
        />
      )}
    </>
  );
};
