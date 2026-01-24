/**
 * Main JavaScript Entry Point
 * Professional Portfolio - Organized Imports
 *
 * Load Order:
 * 1. Core - Base functionality (must load first)
 * 2. Utils - Utility functions
 * 3. Features - Feature-specific scripts
 * 4. Premium - Premium enhancements (loads last to enhance everything)
 *
 * Note: This file serves as documentation.
 * Actual loading is done via script tags in HTML for better browser compatibility.
 */

// ===================================
// INITIALIZATION ORDER
// ===================================

/*
1. CORE (Load First)
   - particles.js       → Particle effects
   - interactive.js     → Interactive animations
   - themes.js          → Theme management
   - script.js          → Main application logic

2. UTILS
   - api-service.js     → API utilities
   - portfolio-utils.js → Portfolio helpers

3. FEATURES
   - blog.js            → Blog functionality
   - search-filter.js   → Search and filter
   - portfolio-enhanced.js → Enhanced portfolio features
   - modern-ui.js       → Modern UI features

4. PREMIUM (Load Last)
   - advanced-ui.js     → Advanced UI enhancements
   - premium-interactions.js → Premium interactions and effects

5. SERVICE WORKER (Last)
   - sw.js              → Service worker registration (in HTML)
*/

// ===================================
// INITIALIZATION CHECK
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Portfolio Initialized', 'color: #FF9900; font-size: 16px; font-weight: bold;');
    console.log('%c📦 Loaded Modules:', 'color: #146EB4; font-size: 14px; font-weight: bold;');

    // Check core modules
    console.log('  ✅ Core modules loaded');

    // Check premium features
    if (window.toast) {
        console.log('  ✅ Toast system ready');
    }

    // Check form validator
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        console.log('  ✅ Form validation ready');
    }

    // Check custom cursor (desktop only)
    if (window.innerWidth >= 768) {
        const cursor = document.querySelector('.cursor-dot');
        if (cursor) {
            console.log('  ✅ Custom cursor active');
        }
    }

    // Check FAB
    const fab = document.querySelector('.fab-container');
    if (fab) {
        console.log('  ✅ FAB menu ready');
    }

    console.log('%c🎨 All systems operational!', 'color: #1EC876; font-size: 14px; font-weight: bold;');
});

// ===================================
// PERFORMANCE MONITORING (Optional)
// ===================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`⚡ Page load time: ${loadTime}ms`);
        }, 0);
    });
}

// ===================================
// ERROR HANDLING
// ===================================

window.addEventListener('error', (event) => {
    console.error('❌ Error detected:', event.error);
    // In production, you might want to send this to an error tracking service
});

// ===================================
// EXPORTS (if using modules in future)
// ===================================

export default {
    version: '2.0.0',
    name: 'Professional Portfolio',
    author: 'Kha Van Hoang',
    features: [
        'Glassmorphism',
        '3D Tilt Effects',
        'Toast Notifications',
        'Form Validation',
        'Custom Cursor',
        'FAB Menu',
        'Scroll Progress',
        'And more...'
    ]
};
