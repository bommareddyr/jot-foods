package com.company.iast.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;

/**
 * Request payload for starting route testing
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestRequest {
    
    @NotBlank(message = "Service name is required")
    private String serviceName;
    
    @NotBlank(message = "Build number is required")
    private String buildNumber;
    
    @NotBlank(message = "Base route URL is required")
    private String baseRouteUrl;
    
    private String environment = "qa";
}
