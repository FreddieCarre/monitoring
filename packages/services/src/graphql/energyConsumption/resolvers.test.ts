import { QueryApi } from '@influxdata/influxdb-client';
import * as influx from '../../influx';
import { resolvers } from './resolvers';

describe('energyConsumption', () => {
  const { energyConsumption } = resolvers.Query;

  let queryApi: jest.SpyInstance;
  const mockQuery = (value: influx.InfluxMeasurement[]) => {
    queryApi.mockImplementation(() => ({
      collectRows: jest.fn()
        .mockReturnValue(Promise.resolve(value))
    } as unknown as QueryApi));
  };

  beforeEach(() => queryApi = jest.spyOn(influx, 'getQueryApi'));
  afterEach(() => jest.resetAllMocks());

  it('should return an empty array when no measurements found', async () => {
    mockQuery([]);
    await expect(energyConsumption()).resolves.toStrictEqual([]);
  });

  it('should return an array of one value when one measurement is found', async () => {
    mockQuery([
      {
        _time: '2020-11-01T12:00:00.222Z',
        _value: 6.53,
        _field: 'mockField',
        _measurement: 'mockMeasurement'
      }
    ]);
    await expect(energyConsumption()).resolves.toStrictEqual([{
      Consumption: 6.53,
      Timestamp: '2020-11-01T12:00:00.222Z'
    }]);
  });

  it('should return an array of values when measurements are found', async () => {
    mockQuery([
      {
        _time: '2020-11-01T12:00:00.222Z',
        _value: 6.53,
        _field: 'mockField',
        _measurement: 'mockMeasurement'
      },
      {
        _time: '2020-12-02T12:00:00.222Z',
        _value: 1,
        _field: 'mockField',
        _measurement: 'mockMeasurement'
      },
      {
        _time: '2020-11-03T12:00:00.222Z',
        _value: 4.91,
        _field: 'mockField',
        _measurement: 'mockMeasurement'
      },
    ]);
    await expect(energyConsumption()).resolves.toStrictEqual([
      {
        Consumption: 6.53,
        Timestamp: '2020-11-01T12:00:00.222Z'
      },
      {
        Consumption: 1,
        Timestamp: '2020-12-02T12:00:00.222Z'
      },
      {
        Consumption: 4.91,
        Timestamp: '2020-11-03T12:00:00.222Z'
      },
    ]);
  });

  it('should throw errors when they are thrown by the Influx client', async () => {
    queryApi.mockImplementation(() => ({
      collectRows: jest.fn()
        .mockReturnValue(Promise.reject('mock error'))
    } as unknown as QueryApi));

    await expect(energyConsumption()).rejects.toThrow('mock error');
  });
});
