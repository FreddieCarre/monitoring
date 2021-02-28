import { getQueryApi, InfluxMeasurement } from '../../influx';
import { getAllEnergyConsumption, getEnergyConsumptionAnomalies } from '../../influx/queries';
import { logger } from '../../../utils/logger';
import { ParameterizedQuery } from '@influxdata/influxdb-client';

const getEnergyConsumption = (
  getDataFunction: (timings: { start?: string, stop?: string }) => string | ParameterizedQuery
) => getQueryApi()
  .collectRows<InfluxMeasurement>(getDataFunction({}))
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

export const resolvers = {
  Query: {
    energyConsumption: async () => getEnergyConsumption(getAllEnergyConsumption),
    energyConsumptionAnomalies: async () => getEnergyConsumption(getEnergyConsumptionAnomalies)
  }
};
