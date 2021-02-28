import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as Graph from '../Graph';
import {DataState} from './DataState';

describe('DataState', () => {
  jest.spyOn(Graph, 'Graph').mockImplementation(
    ({
      energyConsumption,
      energyAnomalies,
      humidityData,
      temperatureData
    }) => <div>
      <p>{energyConsumption}</p>
      <p>{energyAnomalies}</p>
      <p>{humidityData}</p>
      <p>{temperatureData}</p>
    </div>
  );

  it('should pass data into a child Graph component', async () => {
    render(<DataState data={{ energyConsumption: [{ Timestamp: 'Freddie', Consumption: 0 }] }}/>);

    expect(screen.getByText('Freddie')).toBeVisible();
  });

});
