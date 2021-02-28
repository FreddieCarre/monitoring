import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type GraphWrapperProps = {
  energyConsumption?: Highcharts.SeriesAreaDataOptions[],
  energyAnomalies?: Highcharts.SeriesAreaDataOptions[],
  temperatureData?: Highcharts.SeriesAreaDataOptions[],
  humidityData?: Highcharts.SeriesAreaDataOptions[]
};
export const Graph: React.FC<GraphWrapperProps> = ({
  energyConsumption = [],
  energyAnomalies = [],
  temperatureData = [],
  humidityData = []
}) => {

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
        name: 'Temperature',
        data: temperatureData
      },
      {
        type: 'line',
        name: 'Humidity',
        data: humidityData,
        visible: false
      }
    ],
    legend: {
      enabled: true
    }
  };

  return <HighchartsReact
      highcharts={Highcharts}
      options={chartState}
    />;
};

