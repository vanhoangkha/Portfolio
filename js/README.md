# JavaScript Directory 💻

## Structure

All JavaScript files organized by functionality.

```
js/
├── core/           # Core functionality (load first)
├── utils/          # Utility functions
├── features/       # Feature implementations
├── premium/        # Premium enhancements (load last)
└── main.js        # Entry point & monitoring
```

## Load Order

**Critical: Scripts must load in this order!**

1. **Core** → Base functionality
   - particles.js
   - interactive.js
   - themes.js
   - script.js

2. **Utils** → Helper functions
   - api-service.js
   - portfolio-utils.js

3. **Features** → Feature code
   - blog.js
   - search-filter.js
   - portfolio-enhanced.js
   - modern-ui.js

4. **Premium** → Enhancements (enhances everything above)
   - advanced-ui.js
   - premium-interactions.js

5. **Main** → Initialization & monitoring
   - main.js

## Categories

### Core (`core/`)
Base functionality:
- `particles.js` - Particle effects
- `interactive.js` - Interactive animations
- `themes.js` - Theme management
- `script.js` - Main app logic

### Utils (`utils/`)
Helper functions:
- `api-service.js` - API utilities
- `portfolio-utils.js` - Portfolio helpers

### Features (`features/`)
Feature implementations:
- `blog.js` - Blog functionality
- `search-filter.js` - Search & filter
- `portfolio-enhanced.js` - Enhanced features
- `modern-ui.js` - Modern UI features

### Premium (`premium/`)
Premium enhancements:
- `advanced-ui.js` - Advanced UI features
- `premium-interactions.js` - Premium interactions
  - ToastManager class
  - FormValidator class
  - 3D tilt effects
  - Custom cursor
  - FAB menu
  - Scroll effects

## Usage

### In HTML
```html
<!-- Load in order -->
<script src="js/core/particles.js"></script>
<script src="js/core/interactive.js"></script>
<!-- ... etc -->
<script src="js/main.js" type="module"></script>
```

### Adding New JavaScript
1. Create file in appropriate folder
2. Add script tag to HTML in correct position
3. Consider dependencies

## Key Features

### Toast System
```javascript
toast.success('Success!');
toast.error('Error!');
toast.warning('Warning!');
toast.info('Info!');
```

### Form Validation
Automatic validation for forms with ID.

### 3D Effects
Auto-applied to cards with class.

### Custom Cursor
Desktop only, auto-initialized.

## Guidelines

- Keep files focused on one feature
- Use clear function names
- Add JSDoc comments
- Handle errors gracefully
- Consider mobile compatibility
- Test across browsers
