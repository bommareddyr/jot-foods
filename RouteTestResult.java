package com.company.iast.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents the result of testing a single route
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RouteTestResult {
    private String route;
    private String url;
    private int statusCode;
    private String statusMessage;
    private long responseTimeMs;
    private boolean success;
    private String errorMessage;
}
