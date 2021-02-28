import React, {useEffect, useState} from 'react';
import { EnergyConsumption, Weather } from '../../graphql/energyConsumption';

type MetricsProps = {
  energyConsumption?: EnergyConsumption[]
  weather?: Weather[]
};

export const Metrics: React.FC<MetricsProps> = ({
  energyConsumption = [],
  weather = []
}) => {
  return <div id="metrics-container">
      <AverageEnergyConsumptionMetrics energyConsumption={energyConsumption} />
      <AverageTemperatureMetrics weather={weather} />
      <AverageHumidityMetrics weather={weather} />
    </div>;
};

const AverageEnergyConsumptionMetrics: React.FC<Required<Pick<MetricsProps, 'energyConsumption'>>> = ({
  energyConsumption
}) => {
  const [aveEnergyConsumption, setAveEnergyConsumption] = useState<number>();

  useEffect(() => {
    if (energyConsumption.length) {
      const sum = energyConsumption.reduce<number>((a: number, v: EnergyConsumption) => {
        const next = v.Consumption;
        if (next) {
          return a + next;
        }
        return a;
      }, 0);
      const metric = (sum / energyConsumption.length).toFixed(2)
      setAveEnergyConsumption(+metric);
    }
  }, [energyConsumption]);

  return <div>
      <h1>Average Energy Consumption</h1>
      <p data-testid="average-consumption">{aveEnergyConsumption}</p>
    </div>;
};

const AverageTemperatureMetrics: React.FC<Required<Pick<MetricsProps, 'weather'>>> = ({
  weather
}) => {
  const [averageTemperature, setAverageTemperature] = useState<number>();

  useEffect(() => {
    if (weather.length) {
      const sum = weather.reduce<number>((a: number, v: Weather) => {
        const next = v.AverageTemperature;
        if (next) {
          return a + next;
        }
        return a;
      }, 0);
      const metric = (sum / weather.length).toFixed(2)
      setAverageTemperature(+metric);
    }
  }, [weather]);

  return <div>
      <h1>Average Temperature</h1>
      <p data-testid="average-temperature">{averageTemperature}</p>
    </div>;
};

const AverageHumidityMetrics: React.FC<Required<Pick<MetricsProps, 'weather'>>> = ({
  weather
}) => {
  const [averageHumidity, setAverageHumidity] = useState<number>();

  useEffect(() => {
    if (weather.length) {
      const sum = weather.reduce<number>((a: number, v: Weather) => {
        const next = v.AverageHumidity;
        if (next) {
          return a + next;
        }
        return a;
      }, 0);
      const metric = (sum / weather.length).toFixed(2)
      setAverageHumidity(+metric);
    }
  }, [weather]);

  return <div>
      <h1>Average Humidity</h1>
      <p data-testid="average-humidity">{averageHumidity}</p>
    </div>;
};
