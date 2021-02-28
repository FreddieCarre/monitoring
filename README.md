
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

- Font is a bit dull
- General style is slightly outdated
- Query could be adapted to choose which datapoints are being retrieved
- Validation for time input
- Bunch of useEffect calls for sorting data look untidy. Would like to refactor those

4. Use Apollo Subscription to enable live updates from the data collectors

- Utilise websocket technology to receive new data which will be pushed to the client via Apollo

5. Add authentication

- Cognito User Pool
- JWT stored as http cookie

7. Improve networking for local dev env

- Nginx reverse proxy container
- Setup hosts file using shell script [hosts.sh](https://github.com/xwmx/hosts)
- SSL cert

8. CI

- GitHub Actions?

9. Deployment

- ECS with Fargate?
- CloudFormation
- Bash to execute


## Running the solution

### Prerequisites
1. Ensure you have docker and [Task](https://taskfile.dev/#/installation) installed
2. Export the `INFLUX_TOKEN` env var for local use - `export INFLUX_TOKEN=local_token`
3. Run `task init seed up`
4. Navigate to the http://localhost/3000
