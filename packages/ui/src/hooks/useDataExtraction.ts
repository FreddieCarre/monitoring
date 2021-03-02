import { useEffect, useState } from 'react';

import { GraphData } from '../interfaces';

export const useDataExtraction = (
  data: GraphData = {},
  portion: keyof GraphData,
  field: 'Consumption' | 'AverageTemperature' | 'AverageHumidity'
) => {
  const [state, setState] = useState<Highcharts.SeriesAreaDataOptions[]>();

  useEffect(() => {
    if (data[portion]) {
      const arr = data[portion] || [];
      const seriesData: Highcharts.SeriesAreaDataOptions[] = arr.map((v: Record<string, string | number>) => {
          return [
            new Date(v.Timestamp).getTime(),
            v[field]
          ] as Highcharts.SeriesAreaDataOptions;
        });

      setState(seriesData);
    }
  }, [data, field, portion, setState]);

  return state;
};

