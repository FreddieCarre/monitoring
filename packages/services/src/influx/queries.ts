import { flux } from '@influxdata/influxdb-client';
import { Timings } from '../../interfaces';
import { logger } from '../../utils/logger';

const {
  INFLUX_BUCKET = 'test'
} = process.env;

export const getAllEnergyConsumption = ({
  start,
  stop
}: Timings) => {
  logger.info({
    bucket: process.env.INFLUX_BUCKET,
    start,
    stop
  }, 'Getting energy consumption data');

  return flux`
    from(bucket: ${INFLUX_BUCKET})
      |> range(start: ${new Date(start)}, stop: ${new Date(stop)},)
      |> filter(fn: (r) => r["_measurement"] == "energy_consumption")
      |> filter(fn: (r) => r["_field"] == "consumption")
      |> yield(name: "mean")
  `;
};

export const getEnergyConsumptionAnomalies = ({
  start,
  stop
}: Timings) => {
  logger.info({
    bucket: process.env.INFLUX_BUCKET,
    start,
    stop
  }, 'Getting energy consumption anomalies');

  return flux`
    from(bucket: ${INFLUX_BUCKET})
      |> range(start: ${new Date(start)}, stop: ${new Date(stop)},)
      |> filter(fn: (r) => r["_measurement"] == "energy_consumption")
      |> filter(fn: (r) => r["_field"] == "consumption_anomalies")
      |> yield(name: "mean")
  `;
};

export const getAllWeather = ({
  start,
  stop
}: Timings) => {
  logger.info({
    bucket: process.env.INFLUX_BUCKET,
    start,
    stop
  }, 'Getting temperature data');

  return flux`
    from(bucket: ${INFLUX_BUCKET})
      |> range(start: ${new Date(start)}, stop: ${new Date(stop)},)
      |> filter(fn: (r) => r["_measurement"] == "weather")
      |> filter(fn: (r) => r["_field"] == "average_humidity" or r["_field"] == "average_temperature")
      |> yield(name: "mean")
  `;
};
