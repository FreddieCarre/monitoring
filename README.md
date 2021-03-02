
# Energy Monitoring Solution

This application serves as a mechanism for reading energy usage data and presenting this in a readable manner.

## Tasks

1. Prove stack connectivity:

- React -> GraphQL (Apollo) -> InfluxDB
- This will be done when data can be requested from influx and displayed without formatting in a React component.

2. Display in graph format

- Highchart.js to represent the data as a timeseries
- This will be done when an interactive graph is displayed to the user

3. Improve design

- Allow user to choose timeframe to query data

-----------------------------------------------------------------------------------------------------------------------------------

## What was missed

- Tests desperately need improving

### Front end

- General style is slightly outdated
- Query could be adapted to choose which datapoints are being retrieved
- Select the interval for polling
- Validation for time input
- update useEffect to conduct deep equality check on data object (lodash/useDeepCompareEffect?)

5. Add authentication

- Cognito User Pool
- JWT stored as http cookie

7. Improve networking for local dev env

- Nginx reverse proxy container
- Setup hosts file using shell script [hosts.sh](https://github.com/xwmx/hosts)
- SSL cert

8. CI

- GitHub Actions?
- lint -> build -> test

9. Deployment

- EKS in private subnet + load balancers in public subnet?
- CloudFormation
- Bash to execute

## Application Flow

### Data Store

1. Data is streamed from source
2. Data is normalised/validated in-flight by a function (csvParser.ts)
3. Data is stored in InfluxDB

### Reading Data

1. ReactJS client
2. ApolloClient to query GraphQL service
3. User selects range and poll settings (stored in Context rather than redux)
4. useQuery polls every `$POLL_INTERVAL`
5. useEffect parses response when response data changes and updates state for each metric
6. The state for each metric is passed to the relevant display component (graph/metric cards)

## Running the solution

### Prerequisites
1. Ensure you have docker and [Task](https://taskfile.dev/#/installation) installed
2. Export the `INFLUX_TOKEN` env var for local use - `export INFLUX_TOKEN=local_token`
3. Run `task init seed up`
4. Navigate to the http://localhost/3000
