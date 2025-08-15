#!/usr/bin/env bash
set -euo pipefail

docker-compose up -d
echo "Grafana: http://localhost:3000  (admin / admin)"
echo "InfluxDB: http://localhost:8086"
echo "Postgres: localhost:5432 (testops/testops, db=testdata)"
sleep 5

# Run Gatling in background
echo "Starting Gatling in background..."
nohup bash -c "cd gatling-java && mvn -Dgatling.simulationClass=com.example.BrowserProtocolSimulation gatling:test" > gatling.log 2>&1 &

# Run K6 in background
echo "Starting k6 browser test..."
k6 run -o influxdb=http://localhost:8086/loadmetrics k6/browser-ui-simulation.test.js

wait
echo "Hybrid test completed."
