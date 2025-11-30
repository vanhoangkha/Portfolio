# 🎨 Hướng dẫn sử dụng UI Components

## Tổng quan

Bộ sưu tập các component UI hiện đại và đẹp mắt được thiết kế để nâng cao trải nghiệm người dùng.

## 📦 Components có sẵn

### 1. Animated Buttons (`animated-buttons.css`)

#### Gradient Animated Button
```html
<button class="btn-gradient-animated">
    <i class="fas fa-rocket"></i> Click me
</button>
```

#### Neon Button
```html
<button class="btn-neon">Neon Effect</button>
```

#### Liquid Button
```html
<button class="btn-liquid">Liquid Effect</button>
```

#### Shimmer Button
```html
<button class="btn-shimmer">Shimmer</button>
```

#### Pulse Button
```html
<button class="btn-pulse">Pulse</button>
```

#### 3D Button
```html
<button class="btn-3d">3D Effect</button>
```

### 2. Glassmorphism (`glassmorphism.css`)

#### Glass Card
```html
<div class="glass-card">
    <h3>Title</h3>
    <p>Content here...</p>
</div>
```

#### Glass Button
```html
<button class="glass-btn">Glass Button</button>
```

#### Glass Input
```html
<input type="text" class="glass-input" placeholder="Enter text...">
```

#### Glass Badge
```html
<span class="glass-badge">
    <i class="fas fa-star"></i> Badge
</span>
```

### 3. Modern Cards (`modern-cards.css`)

#### Floating Card
```html
<div class="floating-card hover-lift">
    <h3>Floating Card</h3>
    <p>Content...</p>
</div>
```

#### Gradient Border Card
```html
<div class="gradient-border-card">
    <div class="gradient-border-card-inner">
        <h3>Title</h3>
        <p>Content...</p>
    </div>
</div>
```

#### Holographic Card
```html
<div class="holo-card">
    <h3>Holographic</h3>
    <p>Content...</p>
</div>
```

#### Glow Card
```html
<div class="glow-card">
    <h3>Glow Effect</h3>
    <p>Content...</p>
</div>
```

#### Flip Card
```html
<div class="flip-card">
    <div class="flip-card-inner">
        <div class="flip-card-front">
            Front content
        </div>
        <div class="flip-card-back">
            Back content
        </div>
    </div>
</div>
```

#### Neumorphism Card
```html
<div class="neuro-card">
    <h3>Neumorphic Design</h3>
    <p>Content...</p>
</div>
```

### 4. Micro Interactions (`micro-interactions.css`)

#### Hover Scale
```html
<div class="hover-scale">
    Scales on hover
</div>
```

#### Hover Lift
```html
<div class="hover-lift">
    Lifts on hover
</div>
```

#### Hover Glow
```html
<div class="hover-glow">
    Glows on hover
</div>
```

## 🎯 Cách sử dụng

### 1. Import CSS files

```html
<link rel="stylesheet" href="css/components/animated-buttons.css">
<link rel="stylesheet" href="css/components/glassmorphism.css">
<link rel="stylesheet" href="css/components/modern-cards.css">
<link rel="stylesheet" href="css/components/micro-interactions.css">
```

### 2. Sử dụng classes

Chỉ cần thêm class tương ứng vào element:

```html
<button class="btn-gradient-animated">Beautiful Button</button>
<div class="glass-card">Glass Effect Card</div>
```

### 3. Kết hợp nhiều effects

```html
<div class="glass-card hover-lift glass-shine">
    Card với nhiều hiệu ứng
</div>
```

## 🎨 Customization

### Thay đổi màu sắc

Sử dụng CSS variables:

```css
:root {
    --primary-color: #FF9900;
    --bg-primary: #ffffff;
    --text-primary: #333333;
}
```

### Điều chỉnh animation

```css
.btn-gradient-animated {
    animation-duration: 2s; /* Thay đổi tốc độ */
}
```

## 📱 Responsive

Tất cả components đều responsive và hoạt động tốt trên mobile:

```css
@media (max-width: 768px) {
    .card-grid {
        grid-template-columns: 1fr;
    }
}
```

## 🚀 Demo

Xem demo đầy đủ tại: `demo-ui.html`

```bash
# Chạy local server
npm run dev

# Mở browser
http://localhost:8080/demo-ui.html
```

## 💡 Tips

1. **Performance**: Sử dụng `will-change` cho animations phức tạp
2. **Accessibility**: Luôn thêm ARIA labels cho interactive elements
3. **Browser Support**: Test trên nhiều browsers (Chrome, Firefox, Safari)
4. **Dark Mode**: Components tự động adapt với dark theme

## 🎓 Best Practices

### 1. Không lạm dụng animations
```html
<!-- ❌ Tránh -->
<div class="btn-pulse btn-shimmer btn-glitch">Too much!</div>

<!-- ✅ Tốt -->
<button class="btn-gradient-animated">Clean & Simple</button>
```

### 2. Sử dụng đúng context
```html
<!-- Primary action -->
<button class="btn-gradient-animated">Submit</button>

<!-- Secondary action -->
<button class="glass-btn">Cancel</button>
```

### 3. Maintain consistency
Chọn 1-2 styles chính và sử dụng xuyên suốt project.

## 🔧 Troubleshooting

### Backdrop filter không hoạt động?
- Check browser support
- Ensure parent has `overflow: visible`
- Add vendor prefixes

### Animation bị giật?
- Use `transform` thay vì `top/left`
- Add `will-change: transform`
- Optimize với `contain: layout`

## 📚 Resources

- [CSS Tricks - Glassmorphism](https://css-tricks.com/glassmorphism/)
- [MDN - Backdrop Filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [Web.dev - Animations](https://web.dev/animations/)

---

**Tạo bởi Kha Van Hoang** ❤️
