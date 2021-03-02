import React from 'react';
import { render, screen } from '@testing-library/react';
import { useGetSeriesDataMean } from './useGetSeriesDataMean';
import { SeriesAreaDataOptions } from 'highcharts';

const TestHarness: React.FC<{
  data: Highcharts.SeriesAreaDataOptions[],
}> = ({ data }) => {
  const result = useGetSeriesDataMean(data);

  return <h1 data-testid="mean" >{result}</h1>;
};

describe('useGetSeriesDataMean', () => {
  it('should return 0 when passed an empty array', async () => {
    const data: SeriesAreaDataOptions[] = [];

    render(<TestHarness data={data} />);

    expect(screen.getByTestId('mean')).toHaveTextContent('0');
  });

  it('should handle mismatched data points gracefully', async () => {
    const data: SeriesAreaDataOptions[] = [
      [1, 5] as SeriesAreaDataOptions,
      [] as SeriesAreaDataOptions
    ];

    render(<TestHarness data={data} />);

    expect(screen.getByTestId('mean')).toHaveTextContent('5');
  });

  it('should return the average of the data points values', async () => {
    const data: SeriesAreaDataOptions[] = [
      [1, 1] as SeriesAreaDataOptions,
      [1, 2] as SeriesAreaDataOptions,
      [1, 3] as SeriesAreaDataOptions,
      [1, 4] as SeriesAreaDataOptions,
      [1, 5] as SeriesAreaDataOptions
    ];

    render(<TestHarness data={data} />);

    expect(screen.getByTestId('mean')).toHaveTextContent('3');
  });
});
