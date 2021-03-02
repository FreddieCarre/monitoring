import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { RangeContext } from '../Page';
import { RangeSelector } from './RangeSelector';

describe('RangeSelector', () => {
  const setRange = jest.fn();

  it('should default to using the RangeContext', async () => {
    render(
      <RangeContext.Provider value={{ start: '123', stop: '456' }} >
        <RangeSelector setRange={setRange} />
      </ RangeContext.Provider>
    );

    expect(screen.getByTestId('start')).toHaveValue('123');
    expect(screen.getByTestId('stop')).toHaveValue('456');
  });

  it('should present validation errors', async () => {
    render(
      <RangeContext.Provider value={{ start: '123', stop: '456' }} >
        <RangeSelector setRange={setRange} />
      </ RangeContext.Provider>
    );

    expect(screen.getByTestId('start-error')).toHaveTextContent('Please type dates in the format yyyy-mm-ddTHH:mm:ss.SSS');
    expect(screen.getByTestId('stop-error')).toHaveTextContent('Please type dates in the format yyyy-mm-ddTHH:mm:ss.SSS');
  });

  it('should not present validation errors for correct timestamps', async () => {
    const { queryByTestId } = render(
      <RangeContext.Provider value={{ start: '2020-01-02T01:01:03.000Z', stop: '2020-01-02T01:01:03.000Z' }} >
        <RangeSelector setRange={setRange} />
      </ RangeContext.Provider>
    );

    expect(queryByTestId('start-error')).toBeNull();
    expect(queryByTestId('stop-error')).toBeNull();
  });
});
