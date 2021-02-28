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
  beforeAll(() => import('../loadData'));

  it('should return an empty array when no points within 2020-01-03', async () => {
    const { query } = createTestClient(server);

    const res = await query({
      query: ENERGY_CONSUMPTION
    });
    expect(res).toMatchSnapshot();
  });
});
