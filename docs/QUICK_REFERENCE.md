# Quick Reference Guide 🚀

## Tóm Tắt Nhanh Các Tính Năng Premium

### 🔥 Tính Năng Tự Động (Không cần làm gì)

```
✅ Glassmorphism cards       → Tất cả cards có hiệu ứng kính
✅ 3D tilt effect           → Cards nghiêng theo chuột
✅ Spotlight effect         → Ánh sáng follow chuột
✅ Ripple on click          → Sóng khi click buttons
✅ Custom cursor            → Cursor đẹp (desktop)
✅ FAB menu                 → Menu nổi góc dưới phải
✅ Scroll progress          → Ring progress khi scroll
✅ Scroll reveal            → Fade in khi scroll
✅ Form validation          → Validate tự động
✅ Gradient mesh            → Background animated
```

### 💡 Sử Dụng Khi Cần

#### Toast Notifications
```javascript
toast.success('Thành công!');
toast.error('Có lỗi!');
toast.warning('Cảnh báo!');
toast.info('Thông tin!');
```

#### Share Portfolio
```javascript
sharePortfolio(); // Chia sẻ hoặc copy link
```

### 🎨 CSS Classes Hữu Ích

#### Cards
```html
<div class="card-premium">Premium card</div>
<div class="card-holographic">Holographic card</div>
<div class="card-floating">Floating animation</div>
```

#### Buttons
```html
<button class="btn btn-gradient-animated">Gradient</button>
<button class="btn btn-neon">Neon style</button>
<button class="btn btn-pulse">Pulse animation</button>
```

#### Text Effects
```html
<h1 class="text-gradient-animated">Gradient text</h1>
<p class="text-glow">Glowing text</p>
<span class="text-shadow-soft">Soft shadow</span>
```

#### Hover Effects
```html
<div class="hover-lift">Lift on hover</div>
<div class="hover-scale">Scale on hover</div>
<div class="hover-glow">Glow on hover</div>
<div class="hover-rotate">Rotate on hover</div>
```

#### Badges
```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-glow">Glow</span>
<span class="badge badge-pulse">Pulse</span>
```

#### Loading States
```html
<div class="loading-spinner"></div>
<div class="skeleton skeleton-text"></div>
<div class="loading-pulse">Loading...</div>
```

### ⌨️ Keyboard Shortcuts

```
T         → Toggle dark/light theme
Escape    → Close mobile menu / FAB
Ctrl/Cmd + Click email → Copy to clipboard
```

### 📱 FAB Menu Actions

```
🔼 Back to top     → Scroll về đầu trang
📤 Share           → Chia sẻ portfolio
✉️  Contact        → Scroll đến contact form
```

### 🎯 Quick Tips

1. **Hover any card** → See 3D tilt + spotlight
2. **Click any button** → See ripple effect
3. **Move mouse** → See custom cursor (desktop)
4. **Scroll page** → See progress ring
5. **Fill form** → See live validation
6. **Press T** → Toggle theme
7. **Click FAB** → See menu expand

### 🛠️ Customization Nhanh

#### Đổi màu chính
```css
/* In ultra-premium.css */
:root {
  --primary-color: #YOUR-COLOR;
  --gradient-primary: linear-gradient(...);
}
```

#### Điều chỉnh animations
```css
:root {
  --transition-base: 0.3s;  /* Tốc độ transition */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Tắt custom cursor
```css
.cursor-dot,
.cursor-outline {
  display: none !important;
}
```

### 📊 File Structure

```
frontend/
├── premium-enhancements.css   (Glassmorphism, 3D, Toast, Form...)
├── premium-interactions.js    (ToastManager, Validator, 3D Tilt...)
├── ultra-premium.css          (Typography, Buttons, Cards, Badges...)
└── index.html                 (Already linked!)
```

### 🐛 Troubleshooting

#### Toast không hiện
```javascript
// Check console for errors
console.log(window.toast); // Should show ToastManager object
```

#### 3D tilt không hoạt động
```javascript
// Check class applied
document.querySelectorAll('.card-3d-tilt');
```

#### Form validation không chạy
```javascript
// Check form has ID
document.getElementById('contactForm');
```

#### Custom cursor không thấy (Desktop)
```css
/* Check if hidden by another CSS */
.cursor-dot, .cursor-outline {
  display: block !important;
  z-index: 9999 !important;
}
```

### 🎓 Examples

#### Complete Premium Card
```html
<div class="card-premium glass-card-enhanced card-3d-tilt spotlight-container hover-lift">
  <h3 class="text-gradient-animated">Title</h3>
  <p>Content here</p>
  <button class="btn btn-gradient-animated">
    Click me
  </button>
</div>
```

#### Interactive Button
```html
<button class="btn btn-neon ripple-container hover-lift click-effect tooltip"
        data-tooltip="Click to submit">
  Submit
</button>
```

#### Loading State
```html
<div class="loading-spinner"></div>
<p class="loading-pulse">Loading...</p>
```

### 📚 Tài Liệu Đầy Đủ

- `PREMIUM_FEATURES.md` - Chi tiết tất cả features
- `UPGRADE_SUMMARY.md` - Tổng quan nâng cấp
- `QUICK_REFERENCE.md` - Guide nhanh này

### 🎉 That's It!

Portfolio của bạn giờ có **world-class design** và sẵn sàng impress mọi người! 🚀

**Enjoy your premium portfolio!** ✨
