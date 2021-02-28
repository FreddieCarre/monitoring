# Energy Monitoring Solution

This application serves as a mechanism for reading energy usage data and presenting this in a readable manner.

## Tasks

1. Prove stack connectivity:

- React -> GraphQL (Apollo) -> InfluxDB
- This will be done when data can be requested from influx and displayed without formatting in a React component.

2. Display in graph format

- Highchart.js to represent the data as a timeseries
- Style the page
- This will be done when an interactive graph is displayed to the user

3. Improve design

- Dark mode toggle for 24 hour monitoring in varying light conditions
- Select timeframe

4. Use Apollo Subscription to enable live updates from the data collectors

- Utilise websocket technology to receive new data which will be pushed to the client via Apollo

5. Add authentication

- Cognito User Pool
- JWT stored as http cookie

7. CI

- GitHub Actions?

6. Deployment

- ECS with Fargate?
- CloudFormation
- Bash to execute
