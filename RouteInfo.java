package com.company.iast.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a route endpoint retrieved from Contrast Security
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RouteInfo {
    private String path;
    private String method;
    private String signature;
    private String url; // Full URL constructed with base route
}
