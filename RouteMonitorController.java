package com.company.iast.controller;

import com.company.iast.client.ContrastSecurityClient;
import com.company.iast.client.OpenShiftClient;
import com.company.iast.model.TestRequest;
import com.company.iast.model.TestResponse;
import com.company.iast.service.RouteTestingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * REST Controller for IAST Route Monitor
 */
@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Enable CORS for frontend
public class RouteMonitorController {

    private final RouteTestingService routeTestingService;
    private final ContrastSecurityClient contrastClient;
    private final OpenShiftClient openShiftClient;

    /**
     * Main endpoint to execute all route tests
     * POST /api/test
     */
    @PostMapping("/test")
    public ResponseEntity<TestResponse> testRoutes(@Valid @RequestBody TestRequest request) {
        log.info("Received test request for service: {}, build: {}", 
                request.getServiceName(), request.getBuildNumber());
        
        try {
            TestResponse response = routeTestingService.executeRouteTests(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error executing route tests", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(TestResponse.builder()
                            .serviceName(request.getServiceName())
                            .buildNumber(request.getBuildNumber())
                            .totalRoutes(0)
                            .passedRoutes(0)
                            .failedRoutes(0)
                            .build());
        }
    }

    /**
     * Test connection to Contrast Security
     * GET /api/contrast/test-connection
     */
    @GetMapping("/contrast/test-connection")
    public ResponseEntity<Map<String, Object>> testContrastConnection() {
        log.info("Testing Contrast Security connection");
        
        Map<String, Object> response = new HashMap<>();
        boolean connected = contrastClient.testConnection();
        
        response.put("connected", connected);
        response.put("message", connected ? 
                "Successfully connected to Contrast Security" : 
                "Failed to connect to Contrast Security");
        
        return ResponseEntity.ok(response);
    }

    /**
     * Get route URL from OpenShift
     * GET /api/openshift/route?serviceName=xxx
     */
    @GetMapping("/openshift/route")
    public ResponseEntity<Map<String, Object>> getRouteFromOpenShift(
            @RequestParam String serviceName) {
        log.info("Retrieving route URL for service: {} from OpenShift", serviceName);
        
        Map<String, Object> response = new HashMap<>();
        String routeUrl = openShiftClient.getRouteUrl(serviceName);
        
        if (routeUrl != null) {
            response.put("success", true);
            response.put("routeUrl", routeUrl);
            response.put("serviceName", serviceName);
        } else {
            response.put("success", false);
            response.put("message", "Route not found for service: " + serviceName);
        }
        
        return ResponseEntity.ok(response);
    }

    /**
     * Health check endpoint
     * GET /api/health
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "IAST Route Monitor");
        return ResponseEntity.ok(response);
    }
}
