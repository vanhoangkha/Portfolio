#!/bin/bash

echo "🚀 Starting React Portfolio Server..."
echo ""

# Get IP address
IP=$(hostname -I | awk '{print $1}')

echo "Building production version..."
npm run build

echo ""
echo "Starting preview server..."
echo ""
echo "✅ Server will be available at:"
echo "   Local:   http://localhost:3000"
echo "   Network: http://$IP:3000"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npm run preview -- --host 0.0.0.0 --port 3000
