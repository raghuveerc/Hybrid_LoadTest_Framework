# Hybrid UI & Protocol Load Testing Framework

## Overview
This framework is designed to perform **hybrid load testing** combining:
- **UI Load Testing** using K6 Browser to measure real customer experience in the browser.
- **Protocol-level Load Testing** using Gatling (Java/Maven) to simulate backend API/application server load.

It enables teams to see both **end-user experience metrics** and **server performance metrics** in one unified view.

---

## Tools Used (All Open Source)
- **[K6](https://k6.io/)** – Browser and protocol-level load testing.
- **[Gatling](https://gatling.io/)** – High-performance load testing tool for APIs.
- **Java 21** – Required for Gatling Java simulations.
- **Maven** – Build and dependency management for Gatling tests.
- **InfluxDB** – Time-series database for storing test metrics.
- **Grafana** – Visualization and dashboards for test results.

---

## Key Features
1. **Hybrid Execution** – Run browser-based UI tests and backend protocol tests in parallel.
2. **Real-time Monitoring** – Results pushed to InfluxDB and visualized in Grafana.
3. **Parameterization** – Easily configure number of users, iterations, and test durations.
4. **Scalable Design** – Supports running in CI/CD pipelines and linking to existing monitoring systems.

---

## Prerequisites
- Java 21+ installed
- Maven installed (`mvn -v` to verify)
- K6 installed (`k6 version` to verify)
- Access to **Grafana** and **InfluxDB** in your environment (pre-existing setup or local instance)

---

## Running the Tests

### 1. Run Browser (UI) Test
```bash
VUS=5 ITERATIONS=10 k6 run browser-quickpizza.test.js
```

### 2. Run Gatling (Protocol) Test
```bash
mvn gatling:test
```

### 3. Run Both in Parallel
You can trigger both tests in parallel using your CI pipeline or a custom script ( In this case we have run.sh ).


