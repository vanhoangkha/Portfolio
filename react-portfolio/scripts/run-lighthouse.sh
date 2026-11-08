#!/bin/bash

# Lighthouse Audit Runner
# Builds the app, starts preview server, runs Lighthouse, and checks scores

set -e

echo "Starting Lighthouse audit process..."
echo ""

# Build the app
echo "Building application..."
npm run build

# Start preview server in background
echo "Starting preview server..."
npm run preview > /dev/null 2>&1 &
SERVER_PID=$!

# Wait for server to be ready
echo "Waiting for server to start..."
sleep 5

# Check if server is running
if ! curl -f http://localhost:4173 > /dev/null 2>&1; then
  echo "Server failed to start"
  kill $SERVER_PID 2>/dev/null || true
  exit 1
fi

echo "Server is ready"
echo ""

# Run Lighthouse
echo "Running Lighthouse audit..."
npm run lighthouse

# Cleanup
echo ""
echo "Cleaning up..."
kill $SERVER_PID 2>/dev/null || true

echo ""
echo "Lighthouse audit complete!"
echo "Reports saved in lighthouse-reports/"

