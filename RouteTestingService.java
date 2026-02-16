package com.company.iast.service;

import com.company.iast.client.ContrastSecurityClient;
import com.company.iast.model.RouteInfo;
import com.company.iast.model.RouteTestResult;
import com.company.iast.model.TestRequest;
import com.company.iast.model.TestResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * #NewCode: Service that orchestrates the 3-step route testing process
 * Step 1: Connect to Contrast Security
 * Step 2: Retrieve routes
 * Step 3: Test each endpoint
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RouteTestingService {

    private final ContrastSecurityClient contrastClient;

    @Value("${route.testing.timeout}")
    private int routeTimeout;

    @Value("${route.testing.max-concurrent}")
    private int maxConcurrent;

    @Value("${route.testing.retry-attempts}")
    private int retryAttempts;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(30))
            .build();

    /**
     * #NewCode: Main method to execute all 3 steps
     */
    public TestResponse executeRouteTests(TestRequest request) {
        long startTime = System.currentTimeMillis();
        
        log.info("Starting route testing for service: {}, build: {}", 
                request.getServiceName(), request.getBuildNumber());

        // Step 1: Establish Connection to Contrast Security
        log.info("Step 1: Establishing connection to Contrast Security...");
        boolean connected = contrastClient.testConnection();
        if (!connected) {
            throw new RuntimeException("Failed to connect to Contrast Security");
        }
        log.info("Step 1: Successfully connected to Contrast Security");

        // Step 2: Retrieve Routes from Contrast Security
        log.info("Step 2: Retrieving routes for service: {}, build: {}", 
                request.getServiceName(), request.getBuildNumber());
        List<RouteInfo> routes = contrastClient.retrieveRoutes(
                request.getServiceName(), 
                request.getBuildNumber()
        );
        log.info("Step 2: Retrieved {} routes", routes.size());

        if (routes.isEmpty()) {
            log.warn("No routes found for service: {}, build: {}", 
                    request.getServiceName(), request.getBuildNumber());
        }

        // Step 3: Test All Endpoints
        log.info("Step 3: Testing {} endpoints at base URL: {}", 
                routes.size(), request.getBaseRouteUrl());
        List<RouteTestResult> results = testAllRoutes(routes, request.getBaseRouteUrl());
        log.info("Step 3: Completed testing all endpoints");

        // Calculate statistics
        long totalDuration = System.currentTimeMillis() - startTime;
        int passedCount = (int) results.stream().filter(RouteTestResult::isSuccess).count();
        int failedCount = results.size() - passedCount;

        return TestResponse.builder()
                .serviceName(request.getServiceName())
                .buildNumber(request.getBuildNumber())
                .totalRoutes(routes.size())
                .passedRoutes(passedCount)
                .failedRoutes(failedCount)
                .results(results)
                .totalDurationMs(totalDuration)
                .build();
    }

    /**
     * #NewCode: Step 3 - Test all routes with concurrent execution
     */
    private List<RouteTestResult> testAllRoutes(List<RouteInfo> routes, String baseUrl) {
        List<RouteTestResult> results = new ArrayList<>();
        ExecutorService executor = Executors.newFixedThreadPool(maxConcurrent);

        try {
            List<CompletableFuture<RouteTestResult>> futures = new ArrayList<>();

            for (RouteInfo route : routes) {
                CompletableFuture<RouteTestResult> future = CompletableFuture.supplyAsync(
                        () -> testSingleRoute(route, baseUrl),
                        executor
                );
                futures.add(future);
            }

            // Wait for all tests to complete
            CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();

            // Collect results
            for (CompletableFuture<RouteTestResult> future : futures) {
                results.add(future.get());
            }

        } catch (Exception e) {
            log.error("Error testing routes", e);
        } finally {
            executor.shutdown();
        }

        return results;
    }

    /**
     * #NewCode: Test a single route endpoint
     * Makes HTTP GET request and captures response
     */
    private RouteTestResult testSingleRoute(RouteInfo route, String baseUrl) {
        String fullUrl = baseUrl + route.getPath();
        long startTime = System.currentTimeMillis();
        
        log.debug("Testing route: GET {}", fullUrl);

        RouteTestResult.RouteTestResultBuilder resultBuilder = RouteTestResult.builder()
                .route(route.getPath())
                .url(fullUrl);

        try {
            // Replace path parameters with sample values
            String testUrl = replaceDynamicParameters(fullUrl);
            
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(testUrl))
                    .header("Accept", "application/json")
                    .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
                    .timeout(Duration.ofMillis(routeTimeout))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            long responseTime = System.currentTimeMillis() - startTime;

            int statusCode = response.statusCode();
            boolean success = statusCode >= 200 && statusCode < 300;

            resultBuilder
                    .statusCode(statusCode)
                    .statusMessage(getStatusMessage(statusCode))
                    .responseTimeMs(responseTime)
                    .success(success);

            if (success) {
                log.debug("Route test passed: {} - {} ({} ms)", 
                        route.getPath(), statusCode, responseTime);
            } else {
                log.warn("Route test failed: {} - {} ({} ms)", 
                        route.getPath(), statusCode, responseTime);
            }

        } catch (Exception e) {
            long responseTime = System.currentTimeMillis() - startTime;
            log.error("Error testing route: {} - {}", route.getPath(), e.getMessage());
            
            resultBuilder
                    .statusCode(0)
                    .statusMessage("Error")
                    .responseTimeMs(responseTime)
                    .success(false)
                    .errorMessage(e.getMessage());
        }

        return resultBuilder.build();
    }

    /**
     * Replace dynamic path parameters with sample values
     * Example: /api/users/{id} -> /api/users/1
     */
    private String replaceDynamicParameters(String url) {
        String result = url;
        
        // Replace common parameter patterns
        result = result.replaceAll("\\{id\\}", "1");
        result = result.replaceAll("\\{userId\\}", "1");
        result = result.replaceAll("\\{uuid\\}", "550e8400-e29b-41d4-a716-446655440000");
        result = result.replaceAll("\\{[^}]+\\}", "test");
        
        return result;
    }

    /**
     * Get human-readable status message for HTTP status code
     */
    private String getStatusMessage(int statusCode) {
        return switch (statusCode) {
            case 200 -> "OK";
            case 201 -> "Created";
            case 204 -> "No Content";
            case 400 -> "Bad Request";
            case 401 -> "Unauthorized";
            case 403 -> "Forbidden";
            case 404 -> "Not Found";
            case 500 -> "Internal Server Error";
            case 502 -> "Bad Gateway";
            case 503 -> "Service Unavailable";
            default -> "HTTP " + statusCode;
        };
    }
}
