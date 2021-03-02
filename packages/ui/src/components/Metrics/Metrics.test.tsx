import React from 'react';
import { render, screen } from '@testing-library/react';
import { MetricCard, Metrics } from '.';
import { SeriesAreaDataOptions } from 'highcharts';

describe('Metrics', () => {
  const getSeriesData = (d: number[][]) => d.map(v => v as SeriesAreaDataOptions);

  describe('MetricCard', () => {
    it('should display the calculated average for the energyConsumption', () => {
      const energyConsumption: SeriesAreaDataOptions[] = getSeriesData([
        [0, 1], [1, 2], [2, 3]
      ]);

      render(<MetricCard name="Test Card" id="test-card" data={energyConsumption} />);

      expect(screen.getByTestId('test-card')).toHaveTextContent('2');
    });

    it('should display the calculated average for the weather', () => {
      const temperature: SeriesAreaDataOptions[] = getSeriesData([
        [0, 1], [1, 2], [2, 3]
      ]);
      const humidity: SeriesAreaDataOptions[] = getSeriesData([
        [0, 4], [1, 5], [2, 6]
      ]);
      const energy: SeriesAreaDataOptions[] = getSeriesData([
        [0, 7], [1, 8], [2, 9]
      ]);

      render(<Metrics energyConsumption={energy} humidity={humidity} temperature={temperature} />);

      expect(screen.getByTestId('average-temperature')).toHaveTextContent('2');
      expect(screen.getByTestId('average-humidity')).toHaveTextContent('5');
      expect(screen.getByTestId('average-consumption')).toHaveTextContent('8');
    });

    it('should display nothing when no data provided', () => {
      render(<Metrics />);

      expect(screen.getByTestId('average-temperature')).toHaveTextContent('0');
      expect(screen.getByTestId('average-humidity')).toHaveTextContent('0');
      expect(screen.getByTestId('average-consumption')).toHaveTextContent('0');
    });
  });
});
