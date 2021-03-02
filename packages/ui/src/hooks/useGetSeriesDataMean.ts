import { useEffect, useState } from 'react';

export const useGetSeriesDataMean = (data: Highcharts.SeriesAreaDataOptions[]) => {
  const [average, setAverage] = useState<number>(0);

  useEffect(() => {
    const validPoints = data
      .map(d => [...d as number[]])
      .filter(d => d[1]);
    
    const ave = validPoints.reduce((a, d) => {
      a += d[1];

      return a;
    }, 0);

    if (ave === 0) {
      setAverage(0);
    } else {
      setAverage(+(ave / validPoints.length).toFixed(2));
    }
  }, [data, setAverage]);

  return average;
};
