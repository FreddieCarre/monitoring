import React from 'react';
import { render, screen } from '@testing-library/react';
import { Graph } from './';

describe('DataState', () => {
  it('should render Graph with Legend', () => {
    render(<Graph />);

    expect(screen.getByText('Energy Consumption')).toBeVisible();
    expect(screen.getByText('Energy Consumption Anomalies')).toBeVisible();
    expect(screen.getByText('Temperature')).toBeVisible();
    expect(screen.getByText('Humidity')).toBeVisible();
  });
});
