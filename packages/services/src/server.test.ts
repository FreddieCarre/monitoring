import { gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';

import { server } from './server';

const ENERGY_CONSUMPTION = gql`
  query ExampleQuery {
    energyConsumption {
      Timestamp
      Consumption
    }
  }
`;
describe('Server', () => {
  it('should return an empty array when no points found', async () => {
    const { query } = createTestClient(server);

    const res = await query({
      query: ENERGY_CONSUMPTION,
      variables: {
        start: '2020-04-01T00:00:00.000Z',
        stop: '2020-04-01T23:59:59.000Z'
      }
    });
    expect(res).toMatchSnapshot();
  });
});
