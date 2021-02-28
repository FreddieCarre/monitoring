import React from 'react';
import { RangeSelector, RangeSelectorProps } from './RangeSelector';

export const Header: React.FC<RangeSelectorProps> = ({ setRange }) => <div id='header'>
    <h1>Monitoring App</h1>
    <RangeSelector setRange={setRange} />
  </div>;
