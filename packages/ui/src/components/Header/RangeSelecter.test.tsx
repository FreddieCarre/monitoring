import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { RangeContext } from '../Page';
import { RangeSelector } from './RangeSelector';

describe('RangeSelector', () => {
  const setRange = jest.fn();

  it('should default to using the RangeContext', async () => {
    render(
      <RangeContext.Provider value={{ start: 'abc', stop: '123' }} >
        <RangeSelector setRange={setRange} />
      </ RangeContext.Provider>
    );

  });
});
