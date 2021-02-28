import { InfluxDB } from '@influxdata/influxdb-client';

const {
  INFLUX_HOST = 'influx',
  INFLUX_PORT = 8086,
  INFLUX_TOKEN = '',
  INFLUX_BUCKET = 'test',
  INFLUX_ORG = 'test'
} = process.env;

const getInflux = () => new InfluxDB({
  url: `http://${INFLUX_HOST}:${INFLUX_PORT}`,
  token: INFLUX_TOKEN
});

export type InfluxMeasurement = {
  _time: string,
  _value: number,
  _field: string,
  _measurement: string,
};

export const getQueryApi = () => getInflux().getQueryApi(INFLUX_ORG);

export const getWriteApi = () => getInflux().getWriteApi(INFLUX_ORG, INFLUX_BUCKET);
