import { convertCsvStringToObject, parseDate } from './csvParser';

describe('convertCsvStringToObject', () => {
  it('should throw error if headers length is less than row length', () => {
    const csvString = 'header1,header2\nrow1,row2,row3';

    expect(
      () => convertCsvStringToObject(csvString)
    ).toThrow('Header length does not match row length');
  });

  it('should return empty array if only the header row is present', () => {
    const csvString = 'header1,header2';

    expect(
      convertCsvStringToObject(csvString)
    ).toStrictEqual([]);
  });

  it('should return array of values from csv', () => {
    const csvString = 'header1,header2\na1,a2\nb1,b2\nc1,c2';

    expect(
      convertCsvStringToObject(csvString)
    ).toStrictEqual([
      {
        header1: 'a1',
        header2: 'a2'
      },
      {
        header1: 'b1',
        header2: 'b2'
      },
      {
        header1: 'c1',
        header2: 'c2'
      },
    ]);
  });
})

describe('parseDate', () => {
  it('should return ISO formatted date without alterations', () => {
    const inputDates = [
      '2020-01-09T12:52:23.021Z',
      '2020-01-01T02:30:00Z',
      '2020-01-01 16:00:00Z',
      '2020-01-07'
    ];
    inputDates.forEach(date => {
      expect(parseDate(date)).toEqual(date)
    })
  });

  it('should return ISO formatted date after altering known format input', () => {
    const inputDates = [
      {
        pre: '01/01/2020 06:00',
        parsed: '2020-01-01T06:00:00.000Z'
      },
      {
        pre: '02/01/2020 07:30',
        parsed: '2020-01-02T07:30:00.000Z'
      },
      {
        pre:  '03/01/2020 12:00',
        parsed: '2020-01-03T12:00:00.000Z'
      },
      {
        pre:  '07/01/2020 23:30',
        parsed: '2020-01-07T23:30:00.000Z'
      }
    ];

    inputDates.forEach(date => {
      expect(parseDate(date.pre)).toEqual(date.parsed);
    });
  });
});
