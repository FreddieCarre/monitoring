import { getQueryApi, InfluxMeasurement } from '../../influx';
import { getAllEnergyConsumption, getEnergyConsumptionAnomalies } from '../../influx/queries';
import { logger } from '../../../utils/logger';
import { ParameterizedQuery } from '@influxdata/influxdb-client';
import { Timings } from '../../../interfaces';

const getEnergyConsumption = (
  getDataFunction: (timings: Timings) => string | ParameterizedQuery,
  { start, stop }: Timings
) => {
  return getQueryApi()
    .collectRows<InfluxMeasurement>(
      getDataFunction({ start, stop })
    )
    .then(measurements => {
      logger.info({ count: measurements.length }, 'retrieved measurements from Influx');

      return measurements.map(({ _value, _time }) => ({
        Consumption: _value,
        Timestamp: _time
      }));
    })
    .catch(error => {
      logger.error({
        msg: 'failed to get data from Influx',
        error: error.message,
        stack: error.stack
      });
      throw new Error(error);
    });
};

export const resolvers = {
  Query: {
    energyConsumption: async (_p: any, args: Timings) => getEnergyConsumption(
      getAllEnergyConsumption,
      args
    ),
    energyConsumptionAnomalies: async (_p: any, args: Timings) => getEnergyConsumption(
      getEnergyConsumptionAnomalies,
      args
    )
  }
};
