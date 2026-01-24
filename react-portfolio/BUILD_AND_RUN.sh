#!/bin/bash

echo "🚀 React Portfolio - Build and Run"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Menu
echo "Choose an option:"
echo "  1) Start development server (npm run dev)"
echo "  2) Build for production (npm run build)"
echo "  3) Preview production build (npm run preview)"
echo "  4) Run tests (npm test)"
echo "  5) Run all checks (npm run validate)"
echo "  6) Exit"
echo ""
read -p "Enter choice [1-6]: " choice

case $choice in
    1)
        echo ""
        echo -e "${GREEN}Starting development server...${NC}"
        echo "Open http://localhost:3000 in your browser"
        echo ""
        npm run dev
        ;;
    2)
        echo ""
        echo -e "${GREEN}Building for production...${NC}"
        npm run build
        echo ""
        echo -e "${GREEN}✓ Build complete! Output in dist/${NC}"
        ;;
    3)
        echo ""
        echo -e "${GREEN}Building and previewing...${NC}"
        npm run build && npm run preview
        ;;
    4)
        echo ""
        echo -e "${GREEN}Running tests...${NC}"
        npm test
        ;;
    5)
        echo ""
        echo -e "${GREEN}Running all checks...${NC}"
        npm run validate
        ;;
    6)
        echo "Goodbye!"
        exit 0
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac
