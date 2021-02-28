import { getQueryApi, InfluxMeasurement } from '../../influx';
import { getAllWeather } from '../../influx/queries';
import { Weather, Timings } from '../../../interfaces';
import { logger } from '../../../utils/logger';

export const resolvers = {
  Query: {
    async weather(_p: any, args: Timings) {
      return getQueryApi()
        .collectRows<InfluxMeasurement>(
          getAllWeather(args)
        )
        .then(measurements => {
          logger.info({
            count: measurements.length
          }, 'retrieved measurements from Influx');

          return measurements.map(({ _value, _time, _field }) => ({
            ...(_field === 'average_temperature' ? {
              AverageTemperature: _value
            } : {
              AverageHumidity: _value
            }),
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
    },
  },
  Weather: {
    __resolveType(obj: { AverageTemperature?: Weather, AverageHumidity?: Weather}) {
      if(obj.AverageHumidity){
        return 'Humidity';
      }
      if(obj.AverageTemperature){
        return 'Temperature';
      }
      return null; // GraphQLError is thrown
    }
  }
};
