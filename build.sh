#!/bin/bash

# ============================================
# Build and Optimization Script
# Minifies CSS, JS, and HTML files
# ============================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_info() {
    echo -e "${BLUE}ℹ ${1}${NC}"
}

print_success() {
    echo -e "${GREEN}✓ ${1}${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ ${1}${NC}"
}

echo "============================================"
echo "   Build & Optimization Script"
echo "============================================"
echo ""

# Create dist directory
print_info "Creating dist directory..."
rm -rf dist
mkdir -p dist

# Minify CSS files
print_info "Minifying CSS files..."

for file in styles.css animations.css; do
    if [ -f "$file" ]; then
        npx csso $file -o dist/$file
        ORIGINAL=$(wc -c < $file)
        MINIFIED=$(wc -c < dist/$file)
        SAVED=$((ORIGINAL - MINIFIED))
        PERCENT=$((SAVED * 100 / ORIGINAL))
        print_success "$file: $ORIGINAL → $MINIFIED bytes (saved ${PERCENT}%)"
    fi
done

# Minify JavaScript files
print_info "Minifying JavaScript files..."

for file in script.js blog.js interactive.js particles.js themes.js sw.js; do
    if [ -f "$file" ]; then
        npx terser $file -c -m -o dist/$file
        ORIGINAL=$(wc -c < $file)
        MINIFIED=$(wc -c < dist/$file)
        SAVED=$((ORIGINAL - MINIFIED))
        PERCENT=$((SAVED * 100 / ORIGINAL))
        print_success "$file: $ORIGINAL → $MINIFIED bytes (saved ${PERCENT}%)"
    fi
done

# Minify HTML files
print_info "Minifying HTML files..."

for file in index.html blog.html resume.html; do
    if [ -f "$file" ]; then
        npx html-minifier-terser $file \
            --collapse-whitespace \
            --remove-comments \
            --remove-redundant-attributes \
            --remove-script-type-attributes \
            --remove-style-link-type-attributes \
            --use-short-doctype \
            --minify-css true \
            --minify-js true \
            -o dist/$file
        ORIGINAL=$(wc -c < $file)
        MINIFIED=$(wc -c < dist/$file)
        SAVED=$((ORIGINAL - MINIFIED))
        PERCENT=$((SAVED * 100 / ORIGINAL))
        print_success "$file: $ORIGINAL → $MINIFIED bytes (saved ${PERCENT}%)"
    fi
done

# Copy other files
print_info "Copying other files..."
cp -r *.pdf dist/ 2>/dev/null || true
cp manifest.json dist/ 2>/dev/null || true

# Calculate total savings
echo ""
echo "============================================"
print_success "Build completed!"
echo "============================================"
echo ""

ORIGINAL_SIZE=$(du -sb styles.css animations.css script.js blog.js interactive.js particles.js themes.js sw.js index.html blog.html resume.html 2>/dev/null | awk '{sum+=$1} END {print sum}')
MINIFIED_SIZE=$(du -sb dist/* 2>/dev/null | awk '{sum+=$1} END {print sum}')
TOTAL_SAVED=$((ORIGINAL_SIZE - MINIFIED_SIZE))
TOTAL_PERCENT=$((TOTAL_SAVED * 100 / ORIGINAL_SIZE))

echo "Original size:  $(numfmt --to=iec $ORIGINAL_SIZE)"
echo "Minified size:  $(numfmt --to=iec $MINIFIED_SIZE)"
echo "Total saved:    $(numfmt --to=iec $TOTAL_SAVED) (${TOTAL_PERCENT}%)"
echo ""
echo "Optimized files are in the 'dist/' directory"
echo ""
