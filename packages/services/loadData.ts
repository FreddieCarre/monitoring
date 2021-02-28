import { readFileSync } from 'fs';
import { Point } from '@influxdata/influxdb-client';

import { logger } from './utils/logger';
import { getWriteApi } from './src/influx';
import { convertCsvStringToObject, parseDate } from './utils/csvParser';
import { EnergyConsumption, Weather } from './interfaces';

const writeApi = getWriteApi();

try {
  const energyConsumptionPoints = convertCsvStringToObject<EnergyConsumption>(
    Buffer.from(readFileSync('./seeds/HalfHourlyEnergyData.csv'))
      .toString('utf-8')
  ).map(
    ({ Timestamp, Consumption }: EnergyConsumption) => new Point('energy_consumption')
      .floatField('consumption', Consumption)
      .timestamp(new Date(Timestamp))
  );
  const energyConsumptionAnomalousPoints = convertCsvStringToObject<EnergyConsumption>(
    Buffer.from(readFileSync('./seeds/HalfHourlyEnergyDataAnomalies.csv'))
      .toString('utf-8')
  ).map(
    ({ Timestamp, Consumption }: EnergyConsumption) => new Point('energy_consumption')
      .floatField('consumption_anomalies', Consumption)
      .timestamp(new Date(Timestamp))
  );
  const weatherPoints = convertCsvStringToObject<Weather>(
    Buffer.from(readFileSync('./seeds/Weather.csv'))
      .toString('utf-8')
  ).map(
    ({ Date, AverageHumidity, AverageTemperature }: Weather) => {
      return new Point('weather')
        .floatField('average_humidity', AverageHumidity)
        .floatField('average_temperature', AverageTemperature)
        .timestamp(parseDate(Date))
    }
  );

  logger.info('Writing to Influx');
  writeApi.writePoints(energyConsumptionPoints);
  writeApi.writePoints(energyConsumptionAnomalousPoints);
  writeApi.writePoints(weatherPoints);
} catch (error) {
  logger.error({
    msg: 'Failed writing to Influx',
    stack: error.stack,
    error: error.message
  });
} finally {
  logger.debug('Closing Influx writer');
  writeApi.close();
}
