# IAST Route Monitor - Backend

Spring Boot application for automated IAST route testing with Contrast Security integration.

## Overview

This backend service orchestrates a 3-step process:
1. **Connect to Contrast Security** - Establishes authenticated connection
2. **Retrieve Routes** - Fetches all GET endpoints for a service/build
3. **Test Endpoints** - Executes HTTP requests against each route and captures results

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Gradle** (build tool)
- **Contrast Security API** (route discovery)
- **OpenShift Client** (route URL retrieval)
- **Lombok** (reduce boilerplate)

## Project Structure

```
src/main/java/com/company/iast/
├── IASTRouteMonitorApplication.java  # Main Spring Boot application
├── controller/
│   └── RouteMonitorController.java   # REST API endpoints
├── service/
│   └── RouteTestingService.java      # Orchestrates 3-step testing process
├── client/
│   ├── ContrastSecurityClient.java   # Contrast Security integration
│   └── OpenShiftClient.java          # OpenShift integration
├── model/
│   ├── RouteInfo.java               # Route representation
│   ├── RouteTestResult.java         # Test result
│   ├── TestRequest.java             # API request model
│   └── TestResponse.java            # API response model
└── config/
    └── AppConfig.java               # Application configuration
```

## Configuration

### Environment Variables

Create `application.yml` or set environment variables:

```yaml
# Contrast Security
contrast.security.api-url=https://contrast-security.company.com/api
contrast.security.api-key=${CONTRAST_API_KEY}
contrast.security.username=${CONTRAST_USERNAME}
contrast.security.service-key=${CONTRAST_SERVICE_KEY}
contrast.security.organization-id=${CONTRAST_ORG_ID}

# OpenShift
openshift.api-url=${OCP_API_URL}
openshift.token=${OCP_TOKEN}
openshift.namespace=qa

# PAC (if needed)
pac.api-url=${PAC_API_URL}
pac.api-key=${PAC_API_KEY}
```

## Building

### Build with Gradle

```bash
./gradlew clean build
```

### Run locally

```bash
./gradlew bootRun
```

### Build JAR

```bash
./gradlew bootJar
```

The JAR will be in `build/libs/iast-route-monitor-1.0.0-SNAPSHOT.jar`

## API Endpoints

### 1. Test All Routes
Execute the complete 3-step testing process.

```http
POST /api/test
Content-Type: application/json

{
  "serviceName": "user-management-service",
  "buildNumber": "1234",
  "baseRouteUrl": "https://qa-user-mgmt.apps.ocp.company.com",
  "environment": "qa"
}
```

**Response:**
```json
{
  "serviceName": "user-management-service",
  "buildNumber": "1234",
  "totalRoutes": 10,
  "passedRoutes": 8,
  "failedRoutes": 2,
  "totalDurationMs": 5432,
  "results": [
    {
      "route": "/api/users",
      "url": "https://qa-user-mgmt.apps.ocp.company.com/api/users",
      "statusCode": 200,
      "statusMessage": "OK",
      "responseTimeMs": 142,
      "success": true,
      "errorMessage": null
    }
  ]
}
```

### 2. Test Contrast Security Connection
```http
GET /api/contrast/test-connection
```

### 3. Get Route from OpenShift
```http
GET /api/openshift/route?serviceName=user-management-service
```

### 4. Health Check
```http
GET /api/health
```

## How It Works

### Step 1: Connect to Contrast Security
- Authenticates using Basic Auth (username + service key)
- Validates API key
- Tests connectivity with organization query

### Step 2: Retrieve Routes
- Queries Contrast Security API for application by service name
- Fetches route catalog for the application
- Filters for GET endpoints only
- Returns list of route paths

### Step 3: Test Endpoints
- Constructs full URLs using base route URL + route paths
- Replaces dynamic path parameters with test values (`{id}` → `1`)
- Executes HTTP GET requests concurrently (max 5 concurrent)
- Captures response codes, times, and success/failure
- Returns comprehensive test results

## Key Features

- **Concurrent Testing**: Tests multiple routes simultaneously (configurable)
- **Dynamic Parameter Replacement**: Automatically handles path parameters
- **Retry Logic**: Configurable retry attempts for failed requests
- **Detailed Logging**: SLF4J logging at all stages
- **CORS Enabled**: Frontend can call from any origin
- **Error Handling**: Graceful failure with detailed error messages

## Docker Deployment

### Dockerfile
```dockerfile
FROM openjdk:17-slim
WORKDIR /app
COPY build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Build and Run
```bash
./gradlew bootJar
docker build -t iast-route-monitor .
docker run -p 8080:8080 \
  -e CONTRAST_API_KEY=xxx \
  -e CONTRAST_USERNAME=xxx \
  -e CONTRAST_SERVICE_KEY=xxx \
  -e CONTRAST_ORG_ID=xxx \
  -e OCP_TOKEN=xxx \
  iast-route-monitor
```

## Integration with Frontend

Update the frontend JavaScript to call the backend:

```javascript
async function startTesting() {
    const response = await fetch('http://localhost:8080/api/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            serviceName: document.getElementById('service').value,
            buildNumber: document.getElementById('build').value,
            baseRouteUrl: document.getElementById('route').value,
            environment: 'qa'
        })
    });
    
    const results = await response.json();
    // Display results in UI
}
```

## Troubleshooting

### Connection Issues
- Verify API credentials are correct
- Check network connectivity to Contrast Security and OpenShift
- Ensure SSL certificates are trusted (use `-Djavax.net.ssl.trustStore` if needed)

### No Routes Found
- Verify service name matches exactly in Contrast Security
- Check build number is correct
- Ensure application has been instrumented with Contrast agent

### Route Test Failures
- Verify base route URL is correct and accessible
- Check authentication requirements for routes
- Review route test timeout settings

## License

Internal use only - Company Confidential
