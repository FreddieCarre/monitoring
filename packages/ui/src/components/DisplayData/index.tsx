import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';

import { RangeContext } from '../Page';
import { DataState } from './DataState';
import { Metrics } from '../Metrics';
import {
  ENERGY_CONSUMPTION,
  GraphData
} from '../../graphql/energyConsumption';

export const DisplayData = () => {
  const { start, stop } = useContext(RangeContext);

  const { loading, error, data } = useQuery<GraphData>(ENERGY_CONSUMPTION, {
    variables: {
      start,
      stop
    },
    pollInterval: 10_000
  });

  if (error) {
    console.log(error);

    return <p>Error :( </p>;
  };

  return <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <DataState data={data} />
        <Metrics
          energyConsumption={data?.energyConsumption}
          weather={data?.weather}
        />
        </>
      )}
    </>;
};
