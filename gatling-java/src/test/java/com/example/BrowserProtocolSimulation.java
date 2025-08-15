package com.example;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;

public class BrowserProtocolSimulation extends Simulation {

  HttpProtocolBuilder httpProtocol = http
    .baseUrl("https://quickpizza.grafana.com")
    .acceptHeader("text/html,application/json;q=0.9,*/*;q=0.8")
    .userAgentHeader("Gatling/Hybrid");

  ScenarioBuilder scn = scenario("Protocol-Load")
    .exec(
      http("GET_home")
        .get("/")
        .check(status().is(200))
    )
    .pause(1);

  {
    setUp(
      scn.injectOpen(
        rampUsers(90).during(120) // 90 VUs over 2 minutes
      )
    ).protocols(httpProtocol);
  }
}
