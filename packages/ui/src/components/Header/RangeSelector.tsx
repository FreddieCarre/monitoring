import React, { Dispatch, SetStateAction, useCallback, useContext} from 'react';
import { RangeContext } from '../Page';

const DATE_TIME_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
export type RangeSelectorProps = {
  setRange: Dispatch<SetStateAction<{ start: string; stop: string; }>>
};
export const RangeSelector: React.FC<RangeSelectorProps> = ({ setRange }) => {
  const range = useContext(RangeContext);

  return (
    <div id="range-selector">
      <RangeInput name="start" range={range} setRange={setRange}/>
      <RangeInput name="stop" range={range} setRange={setRange}/>
    </div>
  );
};

type RangeInputProps = {
  setRange: (timings: { start: string, stop: string }) => void,
  range: { start: string, stop: string },
  name: 'start' | 'stop'
};
const RangeInput: React.FC<RangeInputProps> = ({
  range,
  setRange,
  name
}) => {

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRange({ ...range, [e.target.name]: e.target.value });
  }, [range, setRange]);

  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input id={name} name={name} type="text" value={range[name]} onChange={handleChange} />
      {!DATE_TIME_REGEX.test(range[name]) &&
        <p>Please type dates in the format yyyy-mm-ddTHH:mm:ss.SSS</p>
      }
    </div>
  );
};

