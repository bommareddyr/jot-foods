#!/bin/bash

# IAST Route Monitor - Quick Start Script

echo "======================================"
echo "IAST Route Monitor - Backend Setup"
echo "======================================"
echo ""

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17 or higher."
    exit 1
fi

echo "✓ Java found: $(java -version 2>&1 | head -n 1)"
echo ""

# Set environment variables (replace with actual values)
echo "Setting up environment variables..."
export CONTRAST_API_KEY="${CONTRAST_API_KEY:-your-api-key-here}"
export CONTRAST_USERNAME="${CONTRAST_USERNAME:-your-username}"
export CONTRAST_SERVICE_KEY="${CONTRAST_SERVICE_KEY:-your-service-key}"
export CONTRAST_ORG_ID="${CONTRAST_ORG_ID:-your-org-id}"
export OCP_TOKEN="${OCP_TOKEN:-your-ocp-token}"
export OCP_API_URL="${OCP_API_URL:-https://api.ocp.company.com:6443}"
export OCP_NAMESPACE="${OCP_NAMESPACE:-qa}"

echo "Environment variables set (using placeholders if not provided)"
echo ""

# Build the application
echo "Building application with Gradle..."
./gradlew clean build -x test

if [ $? -eq 0 ]; then
    echo "✓ Build successful"
    echo ""
    
    # Run the application
    echo "Starting IAST Route Monitor..."
    echo "Server will be available at: http://localhost:8080"
    echo ""
    echo "API Endpoints:"
    echo "  - POST http://localhost:8080/api/test"
    echo "  - GET  http://localhost:8080/api/health"
    echo "  - GET  http://localhost:8080/api/contrast/test-connection"
    echo "  - GET  http://localhost:8080/api/openshift/route?serviceName=xxx"
    echo ""
    
    ./gradlew bootRun
else
    echo "❌ Build failed"
    exit 1
fi
