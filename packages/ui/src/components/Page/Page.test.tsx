import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { Page } from './index';
import { ENERGY_CONSUMPTION } from '../../clients/graphql/energyConsumption';

describe('Page', () => {
  it('should show loading p while waiting for useQuery', async () => {
    const mocks = [{
      request: {
        query: ENERGY_CONSUMPTION,
        variables: { start: '', stop: '' }
      },
      result: {
        data: {}
      }
    }];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Page />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeVisible();
  });

  it('should render a graph for each data type', async () => {
    const mocks = [{
      request: {
        query: ENERGY_CONSUMPTION,
        variables: {
          start: '2020-01-03T00:00:00.000Z',
          stop: '2020-01-03T23:59:59.999Z'
        }
      },
      result: {
        data: {
          energyConsumption: [
            {
              Timestamp: '2020-01-03T00:00:00Z',
              Consumption: 4.43,
              __typename: 'EnergyConsumption'
            }
          ],
          energyConsumptionAnomalies: [
            {
              Timestamp: '2020-01-03T00:00:00Z',
              Consumption: 4.43,
              __typename: 'EnergyConsumptionAnomalies'
            }
          ],
          weather: [
            {
              Timestamp: '2020-01-03T00:00:00Z',
              AverageTemperature: 9,
              __typename: 'Temperature'
            },
            {
              Timestamp: '2020-01-03T12:00:00Z',
              AverageHumidity: 13,
              __typename: 'Humidity'
            },
          ]
        }
      }
    }];
    const { baseElement } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Page />
      </MockedProvider>
    );

    await waitFor(() => screen.getByText('Created with Highcharts 7.2.2'));

    const getSeriesLine = (v: number) => baseElement.querySelectorAll(`.highcharts-line-series.highcharts-series-${v}.highcharts-series`);

    expect(getSeriesLine(0).length).toBe(1);
    expect(getSeriesLine(1).length).toBe(1);
    expect(getSeriesLine(2).length).toBe(1);
    expect(getSeriesLine(3).length).toBe(1);
  });

  it('should render a metric for each data type', async () => {
    const mocks = [{
      request: {
        query: ENERGY_CONSUMPTION,
        variables: {
          start: '2020-01-03T00:00:00.000Z',
          stop: '2020-01-03T23:59:59.999Z'
        }
      },
      result: {
        data: {
          energyConsumption: [
            {
              Timestamp: '2020-01-03T00:00:00Z',
              Consumption: 4.434,
              __typename: 'EnergyConsumption'
            }
          ],
          energyConsumptionAnomalies: [
            {
              Timestamp: '2020-01-03T00:00:00Z',
              Consumption: 19.5,
              __typename: 'EnergyConsumptionAnomalies'
            }
          ],
          weather: [
            {
              Timestamp: '2020-01-03T00:00:00Z',
              AverageHumidity: 0.8,
              __typename: 'Humidity'
            },
            {
              Timestamp: '2020-01-03T12:00:00Z',
              AverageTemperature: 6,
              __typename: 'Temperature'
            },
            {
              Timestamp: '2020-01-03T00:00:00Z',
              AverageTemperature: 9,
              __typename: 'Temperature'
            },
            {
              Timestamp: '2020-01-03T12:00:00Z',
              AverageHumidity: 13,
              __typename: 'Humidity'
            }
          ]
        }
      }
    }];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Page />
      </MockedProvider>
    );

    await waitFor(() => screen.getByText('Created with Highcharts 7.2.2'));

    expect(screen.getByTestId('average-consumption')).toHaveTextContent('4.43')
    expect(screen.getByTestId('average-temperature')).toHaveTextContent('7.5')
    expect(screen.getByTestId('average-humidity')).toHaveTextContent('6.9')
  });

  it('should render an error message when the request fails', async () => {
    const mocks = [{
      request: {
        query: ENERGY_CONSUMPTION,
        variables: {
          start: '2020-01-03T00:00:00.000Z',
          stop: '2020-01-03T23:59:59.999Z'
        }
      },
      error: new Error('Test error')
    }];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Page />
      </MockedProvider>
    );

    await waitFor(() => screen.getByText('Error :('));

    expect(screen.getByText('Error :(')).toBeVisible();
  });
});
