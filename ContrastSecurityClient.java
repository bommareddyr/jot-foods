package com.company.iast.client;

import com.company.iast.model.RouteInfo;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

/**
 * #NewCode: Client for connecting to Contrast Security API
 * Handles authentication and route retrieval
 */
@Slf4j
@Component
public class ContrastSecurityClient {

    @Value("${contrast.security.api-url}")
    private String apiUrl;

    @Value("${contrast.security.api-key}")
    private String apiKey;

    @Value("${contrast.security.username}")
    private String username;

    @Value("${contrast.security.service-key}")
    private String serviceKey;

    @Value("${contrast.security.organization-id}")
    private String organizationId;

    @Value("${contrast.security.timeout}")
    private int timeout;

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public ContrastSecurityClient() {
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(30))
                .build();
        this.objectMapper = new ObjectMapper();
    }

    /**
     * #NewCode: Step 1 - Establish connection to Contrast Security
     * Tests connectivity and authentication
     */
    public boolean testConnection() {
        try {
            log.info("Connecting to Contrast Security at: {}", apiUrl);
            
            String authHeader = createAuthorizationHeader();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl + "/ng/" + organizationId + "/applications"))
                    .header("Authorization", authHeader)
                    .header("API-Key", apiKey)
                    .header("Accept", "application/json")
                    .timeout(Duration.ofMillis(timeout))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            
            if (response.statusCode() == 200) {
                log.info("Successfully connected to Contrast Security");
                return true;
            } else {
                log.error("Failed to connect to Contrast Security. Status: {}", response.statusCode());
                return false;
            }
            
        } catch (Exception e) {
            log.error("Error connecting to Contrast Security", e);
            return false;
        }
    }

    /**
     * #NewCode: Step 2 - Retrieve routes from Contrast Security
     * Fetches all GET endpoints for the specified service and build
     */
    public List<RouteInfo> retrieveRoutes(String serviceName, String buildNumber) {
        List<RouteInfo> routes = new ArrayList<>();
        
        try {
            log.info("Retrieving routes for service: {}, build: {}", serviceName, buildNumber);
            
            // First, get application ID by service name
            String applicationId = getApplicationId(serviceName);
            if (applicationId == null) {
                log.error("Application not found for service: {}", serviceName);
                return routes;
            }
            
            log.info("Found application ID: {} for service: {}", applicationId, serviceName);
            
            // Get routes for the application
            String authHeader = createAuthorizationHeader();
            String routesUrl = String.format("%s/ng/%s/traces/%s/routes", 
                    apiUrl, organizationId, applicationId);
            
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(routesUrl))
                    .header("Authorization", authHeader)
                    .header("API-Key", apiKey)
                    .header("Accept", "application/json")
                    .timeout(Duration.ofMillis(timeout))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            
            if (response.statusCode() == 200) {
                routes = parseRoutesFromResponse(response.body(), buildNumber);
                log.info("Retrieved {} GET routes from Contrast Security", routes.size());
            } else {
                log.error("Failed to retrieve routes. Status: {}, Body: {}", 
                        response.statusCode(), response.body());
            }
            
        } catch (Exception e) {
            log.error("Error retrieving routes from Contrast Security", e);
        }
        
        return routes;
    }

    /**
     * Get application ID by service name
     */
    private String getApplicationId(String serviceName) {
        try {
            String authHeader = createAuthorizationHeader();
            String appsUrl = apiUrl + "/ng/" + organizationId + "/applications";
            
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(appsUrl))
                    .header("Authorization", authHeader)
                    .header("API-Key", apiKey)
                    .header("Accept", "application/json")
                    .timeout(Duration.ofMillis(timeout))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            
            if (response.statusCode() == 200) {
                JsonNode root = objectMapper.readTree(response.body());
                JsonNode applications = root.get("applications");
                
                if (applications != null && applications.isArray()) {
                    for (JsonNode app : applications) {
                        String appName = app.get("name").asText();
                        if (appName.equalsIgnoreCase(serviceName)) {
                            return app.get("app_id").asText();
                        }
                    }
                }
            }
            
        } catch (Exception e) {
            log.error("Error getting application ID", e);
        }
        
        return null;
    }

    /**
     * Parse routes from Contrast Security API response
     */
    private List<RouteInfo> parseRoutesFromResponse(String responseBody, String buildNumber) {
        List<RouteInfo> routes = new ArrayList<>();
        
        try {
            JsonNode root = objectMapper.readTree(responseBody);
            JsonNode routesNode = root.get("routes");
            
            if (routesNode != null && routesNode.isArray()) {
                for (JsonNode routeNode : routesNode) {
                    String method = routeNode.has("verb") ? routeNode.get("verb").asText() : "GET";
                    
                    // Only include GET routes
                    if ("GET".equalsIgnoreCase(method)) {
                        String path = routeNode.get("route").asText();
                        String signature = routeNode.has("signature") ? 
                                routeNode.get("signature").asText() : "";
                        
                        RouteInfo route = RouteInfo.builder()
                                .path(path)
                                .method(method)
                                .signature(signature)
                                .build();
                        
                        routes.add(route);
                    }
                }
            }
            
        } catch (Exception e) {
            log.error("Error parsing routes from response", e);
        }
        
        return routes;
    }

    /**
     * Create Basic Authorization header
     */
    private String createAuthorizationHeader() {
        String credentials = username + ":" + serviceKey;
        String encodedCredentials = Base64.getEncoder()
                .encodeToString(credentials.getBytes(StandardCharsets.UTF_8));
        return "Basic " + encodedCredentials;
    }
}
