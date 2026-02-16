# IAST Route Monitor - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (HTML/JS)                       │
│  - Service Name Input (autocomplete)                            │
│  - Build Number Selection (from PAC)                            │
│  - Base Route URL (from OCP/Excel/Manual)                       │
│  - Test All Routes Button                                       │
└──────────────────────┬──────────────────────────────────────────┘
                       │ HTTP REST API
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Spring Boot Backend (Port 8080)                │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           RouteMonitorController                         │   │
│  │  POST /api/test                                          │   │
│  │  GET  /api/contrast/test-connection                      │   │
│  │  GET  /api/openshift/route?serviceName=xxx              │   │
│  └─────────────────────┬───────────────────────────────────┘   │
│                        │                                         │
│  ┌─────────────────────▼───────────────────────────────────┐   │
│  │           RouteTestingService                            │   │
│  │  - Orchestrates 3-step process                          │   │
│  │  - Concurrent route testing                             │   │
│  │  - Result aggregation                                   │   │
│  └─────┬────────────────────────────────────┬──────────────┘   │
│        │                                     │                   │
│  ┌─────▼──────────────────┐    ┌───────────▼──────────────┐   │
│  │  ContrastSecurityClient│    │   OpenShiftClient        │   │
│  │  - API Authentication  │    │   - Route URL lookup     │   │
│  │  - Route Retrieval     │    │   - Namespace queries    │   │
│  └─────┬──────────────────┘    └──────────────────────────┘   │
└────────┼──────────────────────────────────────────────────────┘
         │
         │ HTTPS REST API
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   External Systems                               │
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │ Contrast Security│  │  OpenShift (OCP) │  │  PAC System  │  │
│  │  - Route catalog │  │  - Route URLs    │  │  - Build info│  │
│  │  - App metadata  │  │  - Namespaces    │  │  - Service   │  │
│  └──────────────────┘  └──────────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Details

### Frontend Layer
- **Technology**: HTML5, CSS3, Vanilla JavaScript
- **Features**:
  - Service name autocomplete
  - Build number dropdown (filtered by service)
  - Multiple route URL input methods (OCP/Excel/Manual)
  - Real-time 3-step progress display
  - Live route testing results with statistics

### Backend Layer
- **Technology**: Java 17, Spring Boot 3.2.0, Gradle
- **Key Components**:

#### 1. Controllers
- `RouteMonitorController`: REST API endpoints
  - Handles HTTP requests from frontend
  - Validates input
  - Orchestrates service calls

#### 2. Services
- `RouteTestingService`: Core business logic
  - **Step 1**: Connect to Contrast Security
  - **Step 2**: Retrieve routes for service/build
  - **Step 3**: Test all endpoints concurrently
  - Aggregates results and statistics

#### 3. Clients
- `ContrastSecurityClient`: Contrast Security integration
  - Basic authentication with API key
  - Application ID lookup by service name
  - Route catalog retrieval
  - Filters for GET endpoints only

- `OpenShiftClient`: OpenShift integration
  - OAuth token authentication
  - Route URL lookup by service name
  - Namespace operations

#### 4. Models
- `TestRequest`: API request payload
- `TestResponse`: API response with aggregated results
- `RouteInfo`: Route metadata from Contrast
- `RouteTestResult`: Individual route test outcome

### External Systems

#### Contrast Security
- **Purpose**: Source of truth for application routes
- **API Endpoints Used**:
  - `/ng/{orgId}/applications` - List applications
  - `/ng/{orgId}/traces/{appId}/routes` - Get routes
- **Authentication**: Basic Auth + API Key

#### OpenShift Container Platform (OCP)
- **Purpose**: Production route URLs
- **API**: Kubernetes/OpenShift REST API
- **Authentication**: Bearer token
- **Resources**: Routes, Namespaces

#### PAC (Policy As Code)
- **Purpose**: Build information and service metadata
- **Integration**: Future enhancement
- **Data**: Build numbers, service names, metadata

## Data Flow - 3-Step Process

### Step 1: Establish Connection
```
Frontend → Backend → Contrast Security
                   ↓
              Test Auth
                   ↓
              Return Success/Failure
```

**Backend Code**:
```java
public boolean testConnection() {
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(apiUrl + "/ng/" + orgId + "/applications"))
        .header("Authorization", createAuthHeader())
        .header("API-Key", apiKey)
        .GET()
        .build();
    
    HttpResponse<String> response = httpClient.send(request);
    return response.statusCode() == 200;
}
```

### Step 2: Retrieve Routes
```
Frontend → Backend → Contrast Security
                   ↓
         Get Application ID by Service Name
                   ↓
         Get Routes for Application
                   ↓
         Filter for GET methods
                   ↓
         Return List<RouteInfo>
```

**Backend Code**:
```java
public List<RouteInfo> retrieveRoutes(String serviceName, String buildNumber) {
    String appId = getApplicationId(serviceName);
    
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(apiUrl + "/ng/" + orgId + "/traces/" + appId + "/routes"))
        .GET()
        .build();
    
    HttpResponse<String> response = httpClient.send(request);
    return parseRoutesFromResponse(response.body());
}
```

### Step 3: Test Endpoints
```
Frontend → Backend → Target Service (via base URL)
                   ↓
         For each route:
           1. Construct full URL
           2. Replace path parameters
           3. Execute HTTP GET
           4. Capture response (status, time)
                   ↓
         Aggregate results
                   ↓
         Return TestResponse
```

**Backend Code**:
```java
private RouteTestResult testSingleRoute(RouteInfo route, String baseUrl) {
    String fullUrl = baseUrl + route.getPath();
    String testUrl = replaceDynamicParameters(fullUrl);
    
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(testUrl))
        .timeout(Duration.ofMillis(routeTimeout))
        .GET()
        .build();
    
    long start = System.currentTimeMillis();
    HttpResponse<String> response = httpClient.send(request);
    long responseTime = System.currentTimeMillis() - start;
    
    return RouteTestResult.builder()
        .route(route.getPath())
        .statusCode(response.statusCode())
        .responseTimeMs(responseTime)
        .success(response.statusCode() >= 200 && response.statusCode() < 300)
        .build();
}
```

## Configuration

### Application Properties
```yaml
contrast:
  security:
    api-url: https://contrast-security.company.com/api
    api-key: ${CONTRAST_API_KEY}
    username: ${CONTRAST_USERNAME}
    service-key: ${CONTRAST_SERVICE_KEY}
    organization-id: ${CONTRAST_ORG_ID}

openshift:
  api-url: ${OCP_API_URL}
  token: ${OCP_TOKEN}
  namespace: qa

route:
  testing:
    timeout: 10000          # 10 seconds per route
    max-concurrent: 5       # Parallel testing
    retry-attempts: 2       # Retry failed requests
```

## Security Considerations

1. **API Credentials**: Stored in environment variables, never hardcoded
2. **CORS**: Enabled for frontend, but should be restricted in production
3. **SSL/TLS**: All external API calls use HTTPS
4. **Token Management**: OpenShift tokens should be rotated regularly
5. **Rate Limiting**: Consider implementing to avoid overwhelming target services

## Scalability

- **Concurrent Testing**: Configurable thread pool (default: 5)
- **Async Processing**: CompletableFuture for non-blocking operations
- **Connection Pooling**: HTTP client connection reuse
- **Stateless Design**: Each request is independent

## Error Handling

- **Connection Failures**: Graceful degradation with error messages
- **Timeout Handling**: Configurable timeouts at multiple levels
- **Route Test Failures**: Captured and reported individually
- **Logging**: Comprehensive logging at DEBUG/INFO/ERROR levels

## Monitoring & Observability

- **Health Endpoint**: `/api/health`
- **SLF4J Logging**: Structured logging throughout
- **Metrics**: Response times, success rates captured
- **Future**: Add Prometheus metrics, distributed tracing

## Deployment Options

### Local Development
```bash
./gradlew bootRun
```

### Docker
```bash
docker build -t iast-route-monitor .
docker run -p 8080:8080 iast-route-monitor
```

### Kubernetes/OpenShift
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: iast-route-monitor
spec:
  replicas: 2
  template:
    spec:
      containers:
      - name: iast-monitor
        image: iast-route-monitor:latest
        ports:
        - containerPort: 8080
        env:
        - name: CONTRAST_API_KEY
          valueFrom:
            secretKeyRef:
              name: contrast-credentials
              key: api-key
```

## Future Enhancements

1. **WebSocket Support**: Real-time progress updates
2. **PAC Integration**: Automatic service/build discovery
3. **Report Generation**: PDF/HTML reports
4. **Scheduling**: Automated testing on build completion
5. **Notification**: Slack/Email alerts for failures
6. **Test Data Management**: Smart parameter replacement
7. **Performance Metrics**: Response time trends, SLAs
8. **Multi-environment**: Support for dev/staging/prod testing
