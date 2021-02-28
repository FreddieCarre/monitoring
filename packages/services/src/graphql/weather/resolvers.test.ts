import { QueryApi } from '@influxdata/influxdb-client';
import * as influx from '../../influx';
import { resolvers } from './resolvers';

describe('weather', () => {
  const { weather } = resolvers.Query;

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
    await expect(weather(
      null,
      { start: '2020-11-01T12:00:00.222Z', stop: '2020-11-01T12:00:00.222Z' }
    )).resolves.toStrictEqual([]);
  });

  it('should correctly extract average_temperature', async () => {
    mockQuery([
      {
        _time: '2020-11-01T12:00:00.222Z',
        _value: 6.53,
        _field: 'average_temperature',
        _measurement: 'mockMeasurement'
      }
    ]);
    await expect(weather(
      null,
      { start: '2020-11-01T12:00:00.222Z', stop: '2020-11-01T12:00:00.222Z' }
    )).resolves.toStrictEqual([{
      AverageTemperature: 6.53,
      Timestamp: '2020-11-01T12:00:00.222Z'
    }]);
  });

  it('should correctly extract average_humidity', async () => {
    mockQuery([
      {
        _time: '2020-11-01T12:00:00.222Z',
        _value: 0.5,
        _field: 'average_humidity',
        _measurement: 'mockMeasurement'
      }
    ]);
    await expect(weather(
      null,
      { start: '2020-11-01T12:00:00.222Z', stop: '2020-11-01T12:00:00.222Z' }
    )).resolves.toStrictEqual([{
      AverageHumidity: 0.5,
      Timestamp: '2020-11-01T12:00:00.222Z'
    }]);
  });

  it('should correctly extract negative values', async () => {
    mockQuery([
      {
        _time: '2020-11-01T12:00:00.222Z',
        _value: -2.03,
        _field: 'average_humidity',
        _measurement: 'mockMeasurement'
      }
    ]);
    await expect(weather(
      null,
      { start: '2020-11-01T12:00:00.222Z', stop: '2020-11-01T12:00:00.222Z' }
    )).resolves.toStrictEqual([{
      AverageHumidity: -2.03,
      Timestamp: '2020-11-01T12:00:00.222Z'
    }]);
  });

  it('should return an array of values when measurements are found', async () => {
    mockQuery([
      {
        _time: '2020-11-01T12:00:00.222Z',
        _value: 6.53,
        _field: 'average_humidity',
        _measurement: 'mockMeasurement'
      },
      {
        _time: '2020-12-02T12:00:00.222Z',
        _value: 1,
        _field: 'average_temperature',
        _measurement: 'mockMeasurement'
      },
      {
        _time: '2020-11-03T12:00:00.222Z',
        _value: 4.91,
        _field: 'average_temperature',
        _measurement: 'mockMeasurement'
      },
    ]);
    await expect(weather(
      null,
      { start: '2020-11-01T12:00:00.222Z', stop: '2020-11-01T12:00:00.222Z' }
    )).resolves.toStrictEqual([
      {
        AverageHumidity: 6.53,
        Timestamp: '2020-11-01T12:00:00.222Z'
      },
      {
        AverageTemperature: 1,
        Timestamp: '2020-12-02T12:00:00.222Z'
      },
      {
        AverageTemperature: 4.91,
        Timestamp: '2020-11-03T12:00:00.222Z'
      },
    ]);
  });

  it('should throw errors when they are thrown by the Influx client', async () => {
    queryApi.mockImplementation(() => ({
      collectRows: jest.fn()
        .mockReturnValue(Promise.reject('mock error'))
    } as unknown as QueryApi));

    await expect(weather(
      null,
      { start: '2020-11-01T12:00:00.222Z', stop: '2020-11-01T12:00:00.222Z' }
    )).rejects.toThrow('mock error');
  });
});
