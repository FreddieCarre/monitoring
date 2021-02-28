import { logger } from './logger';

export const convertCsvStringToObject = <T extends Record<string, string>>(
  csvString: string,
  delim = ','
): T[] => {
  logger.info('Converting csv to object');
  const [headers, ...rows] = csvString
    .replace(/\r/g, '')
    .split('\n')
    .filter(row => !!row)
    .map(row => row.split(delim));

  logger.info({ headers, rows: rows.length }, 'parsed csv data');
  return rows.map(row => {
    if (headers.length !== row.length) {
      const msg = 'Header length does not match row length'
      logger.error({ msg, headers: headers.length, rows: row.length });

      throw new Error(msg);
    }

    return row.reduce<Record<string, string>>((acc, col, index) => {
      acc[headers[index].trim()] = col.trim();

      return acc;
    }, {}) as T;
  });
};

export const parseDate = (dateString: string) => {
  const INVALID_FORMAT = /(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2})/;
  if (INVALID_FORMAT.test(dateString)) {
    const [
      _full,
      day,
      month,
      years,
      hours,
      minutes
    ] = INVALID_FORMAT.exec(dateString) || [];

    return new Date(
      parseInt(years),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );
  };

  return dateString;
};
