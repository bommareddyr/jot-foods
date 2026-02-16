package com.company.iast.client;

import io.fabric8.kubernetes.client.Config;
import io.fabric8.kubernetes.client.ConfigBuilder;
import io.fabric8.openshift.api.model.Route;
import io.fabric8.openshift.client.DefaultOpenShiftClient;
import io.fabric8.openshift.client.OpenShiftClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Client for retrieving route URLs from OpenShift Container Platform
 */
@Slf4j
@Component
public class OpenShiftClient {

    @Value("${openshift.api-url}")
    private String apiUrl;

    @Value("${openshift.token}")
    private String token;

    @Value("${openshift.namespace}")
    private String namespace;

    /**
     * Get route URL for a service from OpenShift
     */
    public String getRouteUrl(String serviceName) {
        try {
            log.info("Retrieving route URL for service: {} from OpenShift", serviceName);
            
            Config config = new ConfigBuilder()
                    .withMasterUrl(apiUrl)
                    .withOauthToken(token)
                    .withTrustCerts(true)
                    .withNamespace(namespace)
                    .build();

            try (OpenShiftClient client = new DefaultOpenShiftClient(config)) {
                // Try to find route by service name
                Route route = client.routes()
                        .inNamespace(namespace)
                        .withName(serviceName)
                        .get();

                if (route != null && route.getSpec() != null) {
                    String host = route.getSpec().getHost();
                    String protocol = route.getSpec().getTls() != null ? "https" : "http";
                    String routeUrl = protocol + "://" + host;
                    
                    log.info("Found route URL: {} for service: {}", routeUrl, serviceName);
                    return routeUrl;
                }
                
                log.warn("No route found for service: {}", serviceName);
            }
            
        } catch (Exception e) {
            log.error("Error retrieving route from OpenShift", e);
        }
        
        return null;
    }

    /**
     * Test connection to OpenShift
     */
    public boolean testConnection() {
        try {
            log.info("Testing connection to OpenShift at: {}", apiUrl);
            
            Config config = new ConfigBuilder()
                    .withMasterUrl(apiUrl)
                    .withOauthToken(token)
                    .withTrustCerts(true)
                    .build();

            try (OpenShiftClient client = new DefaultOpenShiftClient(config)) {
                // Try to list namespaces as a connection test
                client.namespaces().list();
                log.info("Successfully connected to OpenShift");
                return true;
            }
            
        } catch (Exception e) {
            log.error("Failed to connect to OpenShift", e);
            return false;
        }
    }
}
