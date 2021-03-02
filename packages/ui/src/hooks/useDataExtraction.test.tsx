import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDataExtraction } from './useDataExtraction';

import { GraphData } from '../interfaces';

const TestHarness: React.FC<{
  data: GraphData,
  portion: keyof GraphData,
  field: 'Consumption' | 'AverageTemperature' | 'AverageHumidity'
}> = ({ data = {}, portion, field }) => {
  const result = useDataExtraction(data, portion, field);

  return (
    <>
      {result && result.map((r, i) => <h1 key={i} data-testid={i}>{r}</h1>)}
    </>
  )
};

describe('hooks', () => {
  describe('useDataExtraction', () => {
    it('should return an empty array when passed an empty array', async () => {
      const data = { energyConsumption: [] };
      const portion = 'energyConsumption';
      const field = 'Consumption';

      const { queryByTestId } = render(<TestHarness data={data} portion={portion} field={field} />);

      expect(document.querySelectorAll('h1').length).toBe(0);
      expect(queryByTestId('0')).toBeNull();
    });

    describe('should extract the data points for each field', () => {
      it('should return an the data points for energyConsumption field', async () => {
        const data = { energyConsumption: [
          {
            Timestamp: '2020-01-01T01:01:01.000Z',
            Consumption: 9
          }
        ]};
        const portion = 'energyConsumption';
        const field = 'Consumption';

        render(<TestHarness data={data} portion={portion} field={field} />);

        expect(document.querySelectorAll('h1').length).toBe(1);
        expect(screen.getByTestId('0'))
          .toHaveTextContent('15778404610009');
      });

      it('should return an the data points for temperature fields', async () => {
        const data = { weather: [
          {
            Timestamp: '2020-01-01T01:01:01.000Z',
            AverageTemperature: 9,
            AverageHumidity: 4
          },
          {
            Timestamp: '2020-01-01T01:31:01.000Z',
            AverageTemperature: 4,
            AverageHumidity: 1
          }
        ]};
        const portion = 'weather';
        const field = 'AverageTemperature';

        render(<TestHarness data={data} portion={portion} field={field} />);

        expect(document.querySelectorAll('h1').length).toBe(2);
        expect(screen.getByTestId('0'))
          .toHaveTextContent('15778404610009');
        expect(screen.getByTestId('1'))
          .toHaveTextContent('15778422610004');
      });

      it('should return an the data points for humidity fields', async () => {
        const data = { weather: [
          {
            Timestamp: '2020-01-01T01:01:01.000Z',
            AverageTemperature: 9,
            AverageHumidity: 4
          },
          {
            Timestamp: '2020-01-01T01:31:01.000Z',
            AverageTemperature: 4,
            AverageHumidity: 1
          },
          {
            Timestamp: '2020-01-01T02:01:01.000Z',
            AverageTemperature: 4,
            AverageHumidity: 6
          }
        ]};
        const portion = 'weather';
        const field = 'AverageHumidity';

        render(<TestHarness data={data} portion={portion} field={field} />);

        expect(document.querySelectorAll('h1').length).toBe(3);
        expect(screen.getByTestId('0'))
          .toHaveTextContent('15778404610004');
        expect(screen.getByTestId('1'))
          .toHaveTextContent('15778422610001');
        expect(screen.getByTestId('2'))
          .toHaveTextContent('15778440610006');
      });
    });
  });
})
