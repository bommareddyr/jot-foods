package com.company.iast.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Response payload containing test results
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestResponse {
    private String serviceName;
    private String buildNumber;
    private int totalRoutes;
    private int passedRoutes;
    private int failedRoutes;
    private List<RouteTestResult> results;
    private long totalDurationMs;
}
