import { Point } from '@influxdata/influxdb-client';
import { getWriteApi } from '../src/influx';

export const writeData = (data: Point[]) => {
  const writeApi = getWriteApi();

  try {
    writeApi.writePoints(data)
  } catch (error) {
    throw new Error(error);
  } finally {
    writeApi.close();
  }
};
