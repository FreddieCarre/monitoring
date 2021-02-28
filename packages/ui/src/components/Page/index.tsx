import React, {useState} from 'react';
import { DisplayData } from '../DisplayData';
import {Header} from '../Header';

const defaultRange = {
  start: '2020-01-03T00:00:00.000Z',
  stop: '2020-01-03T23:59:59.999Z'
};
export const RangeContext = React.createContext(defaultRange);

export const Page = () => {
  const [range, setRange] = useState(defaultRange);
  return (
    <RangeContext.Provider value={range} >
      <Header setRange={setRange}/>
      <DisplayData />
    </RangeContext.Provider>
  );
};
