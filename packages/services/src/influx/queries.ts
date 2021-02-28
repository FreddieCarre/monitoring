import { flux } from '@influxdata/influxdb-client';
import { logger } from '../../utils/logger';

const {
  INFLUX_BUCKET = 'test'
} = process.env;

export const getAllEnergyConsumption = ({
  start = '2020-01-03T00:00:00.000Z',
  stop = '2020-01-03T23:59:59.999Z'
}) => {
  logger.info({ bucket: process.env.INFLUX_BUCKET }, 'Getting energy consumption data');

  return flux`
    from(bucket: ${INFLUX_BUCKET})
      |> range(start: ${new Date(start)}, stop: ${new Date(stop)},)
      |> filter(fn: (r) => r["_measurement"] == "energy_consumption")
      |> filter(fn: (r) => r["_field"] == "consumption")
      |> yield(name: "mean")
  `;
};

export const getEnergyConsumptionAnomalies = ({
  start = '2020-01-03T00:00:00.000Z',
  stop = '2020-01-03T23:59:59.999Z'
}) => {
  logger.info({ bucket: process.env.INFLUX_BUCKET }, 'Getting energy consumption anomalies');

  return flux`
    from(bucket: ${INFLUX_BUCKET})
      |> range(start: ${new Date(start)}, stop: ${new Date(stop)},)
      |> filter(fn: (r) => r["_measurement"] == "energy_consumption")
      |> filter(fn: (r) => r["_field"] == "consumption_anomalies")
      |> yield(name: "mean")
  `;
};

export const getAllWeather = ({
  start = '2020-01-03T00:00:00.000Z',
  stop = '2020-01-03T23:59:59.999Z'
}) => {
  logger.info({ bucket: process.env.INFLUX_BUCKET }, 'Getting temperature data');

  return flux`
    from(bucket: ${INFLUX_BUCKET})
      |> range(start: ${new Date(start)}, stop: ${new Date(stop)},)
      |> filter(fn: (r) => r["_measurement"] == "weather")
      |> filter(fn: (r) => r["_field"] == "average_humidity" or r["_field"] == "average_temperature")
      |> yield(name: "mean")
  `;
};
