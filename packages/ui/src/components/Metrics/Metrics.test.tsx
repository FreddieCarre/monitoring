import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Metrics } from '.';

describe('Metrics', () => {
  describe('AverageEnergyConsumptionMetrics', () => {
    it('should display the calculated average for the provided data', () => {
      const energyConsumption = [
        {
          Timestamp: '',
          Consumption: 1
        },
        {
          Timestamp: '',
          Consumption: 2
        },
        {
          Timestamp: '',
          Consumption: 3
        }
      ];

      render(<Metrics energyConsumption={energyConsumption} />);

      expect(screen.getByTestId('average-consumption')).toHaveTextContent('2');
    });

    it('should display the calculated average for a single data point', () => {
      const energyConsumption = [
        {
          Timestamp: '',
          Consumption: 1.65
        }
      ];

      render(<Metrics energyConsumption={energyConsumption} />);

      expect(screen.getByTestId('average-consumption')).toHaveTextContent('1.65');
    });

    it('should display nothing when no data provided', () => {
      render(<Metrics />);

      expect(screen.getByTestId('average-consumption')).toHaveTextContent('');
    });
  });
});
