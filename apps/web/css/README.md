# CSS Directory 🎨

## Structure

All CSS files organized by purpose and category.

```
css/
├── core/           # Core styles (load first)
├── components/     # Component styles
├── features/       # Feature-specific styles
├── premium/        # Premium enhancements
└── main.css       # Entry point (imports all)
```

## Load Order

Managed by `main.css`:
1. **Core** → Base styles, variables, animations
2. **Components** → Reusable components
3. **Features** → Feature implementations
4. **Premium** → Premium enhancements

## Categories

### Core (`core/`)
Base styles that everything else builds on:
- `styles.css` - Variables, reset, base styles
- `animations.css` - Keyframe animations

### Components (`components/`)
Reusable UI components:
- `loading-error.css` - Loading states and error UI
- `search-filter.css` - Search and filter components

### Features (`features/`)
Feature-specific styles:
- `portfolio-enhanced.css` - Enhanced portfolio features
- `modern-ui.css` - Modern UI enhancements

### Premium (`premium/`)
Premium visual effects:
- `premium-enhancements.css` - Glassmorphism, 3D effects
- `ultra-premium.css` - Typography system, advanced features
- `advanced-ui.css` - Advanced UI components

## Usage

### In HTML
```html
<!-- Single import for all CSS -->
<link rel="stylesheet" href="css/main.css">
```

### Adding New CSS
1. Create file in appropriate folder
2. Add import to `main.css`:
   ```css
   @import url('./category/your-file.css');
   ```

## Guidelines

- Keep files focused on one purpose
- Use clear, descriptive names
- Follow existing naming conventions
- Document complex selectors
- Maintain proper cascade order
