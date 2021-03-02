import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';

import { RangeContext } from '../Page';
import { Graph } from '../Graph';
import { Metrics } from '../Metrics';

import { useDataExtraction } from '../../hooks/useDataExtraction';
import { ENERGY_CONSUMPTION } from '../../clients/graphql/energyConsumption';
import { GraphData } from '../../interfaces';

export const DisplayData = () => {
  const { start, stop } = useContext(RangeContext);

  const { loading, error, data } = useQuery<GraphData>(ENERGY_CONSUMPTION, {
    variables: {
      start,
      stop
    },
    pollInterval: 10_000
  });

  const energyConsumption = useDataExtraction(data, 'energyConsumption', 'Consumption')
  const energyAnomalies = useDataExtraction(data, 'energyConsumptionAnomalies', 'Consumption')
  const humidityData = useDataExtraction(data, 'weather', 'AverageHumidity')
  const temperatureData = useDataExtraction(data, 'weather', 'AverageTemperature')

  if (error) {
    console.log(error);

    return <p>Error :( </p>;
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Graph
            energyConsumption={energyConsumption}
            energyAnomalies={energyAnomalies}
            temperatureData={temperatureData}
            humidityData={humidityData}
          />
          <Metrics
            energyConsumption={energyConsumption}
            temperature={temperatureData}
            humidity={humidityData}
          />
        </>
      )}
    </>
  );
};
