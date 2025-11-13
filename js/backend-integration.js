/**
 * Backend Integration Module
 * Connects portfolio frontend with AWS Amplify backend
 */

import './config/amplify-config.js';
import { getBlogPosts, getBlogCategories } from './api/blog.js';
import { getProjects, getTechnologies } from './api/projects.js';
import { submitContactForm } from './api/contact.js';

// Make API functions available globally
window.portfolioAPI = {
  blog: {
    getPosts: getBlogPosts,
    getCategories: getBlogCategories
  },
  projects: {
    getProjects,
    getTechnologies
  },
  contact: {
    submit: submitContactForm
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c🔗 Backend Integration Active', 'color: #FF9900; font-size: 14px; font-weight: bold;');

  // Trigger data loading based on current page
  const currentPage = window.location.pathname;

  if (currentPage.includes('blog.html')) {
    loadBlogPage();
  } else if (currentPage.includes('index.html') || currentPage === '/' || currentPage === '') {
    loadHomePage();
  }
});

/**
 * Load blog page with dynamic data
 */
async function loadBlogPage() {
  try {
    const posts = await getBlogPosts({ limit: 20 });
    const categories = await getBlogCategories();

    console.log(`📝 Loaded ${posts.length} blog posts from backend`);
    console.log(`📂 Categories:`, categories);

    // Render blog posts
    renderBlogPosts(posts);
    renderCategories(categories);
  } catch (error) {
    console.error('Error loading blog page:', error);
  }
}

/**
 * Load home page with featured content
 */
async function loadHomePage() {
  try {
    const [featuredPosts, featuredProjects] = await Promise.all([
      getBlogPosts({ featuredOnly: true, limit: 6 }),
      getProjects({ featuredOnly: true, limit: 6 })
    ]);

    console.log(`⭐ Loaded ${featuredPosts.length} featured blog posts`);
    console.log(`⭐ Loaded ${featuredProjects.length} featured projects`);

    // Render featured content
    renderFeaturedBlog(featuredPosts);
    renderFeaturedProjects(featuredProjects);
  } catch (error) {
    console.error('Error loading home page:', error);
  }
}

/**
 * Render blog posts in the blog grid
 */
function renderBlogPosts(posts) {
  const container = document.querySelector('.blog-grid');
  if (!container) return;

  container.innerHTML = posts.map(post => `
    <article class="blog-card" data-category="${post.category || 'Uncategorized'}">
      ${post.featuredImage ? `
        <div class="blog-image">
          <img src="${post.featuredImage}" alt="${post.title}" loading="lazy">
        </div>
      ` : ''}
      <div class="blog-content">
        <div class="blog-meta">
          <span class="category">${post.category || 'Uncategorized'}</span>
          <span class="date">${formatDate(post.publishedAt || post.createdAt)}</span>
          ${post.featured ? '<span class="badge featured">Featured</span>' : ''}
        </div>
        <h3>${post.title}</h3>
        <p>${post.excerpt || truncate(stripHtml(post.content), 150)}</p>
        <div class="blog-tags">
          ${(post.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="blog-footer">
          <span class="views"><i class="fas fa-eye"></i> ${post.viewCount || 0}</span>
          <a href="/blog/${post.slug}.html" class="read-more">
            Read More <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

/**
 * Render blog categories filter
 */
function renderCategories(categories) {
  const container = document.querySelector('.blog-categories');
  if (!container) return;

  container.innerHTML = `
    <button class="category-btn active" data-category="all">
      All <span class="count">${categories.reduce((sum, cat) => sum + cat.count, 0)}</span>
    </button>
    ${categories.map(cat => `
      <button class="category-btn" data-category="${cat.name}">
        ${cat.name} <span class="count">${cat.count}</span>
      </button>
    `).join('')}
  `;

  // Add filter functionality
  container.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      filterBlogByCategory(category);

      // Update active state
      container.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/**
 * Filter blog posts by category
 */
function filterBlogByCategory(category) {
  const cards = document.querySelectorAll('.blog-card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

/**
 * Render featured blog posts on home page
 */
function renderFeaturedBlog(posts) {
  const container = document.querySelector('.featured-blog-grid');
  if (!container) return;

  container.innerHTML = posts.slice(0, 6).map(post => `
    <article class="blog-card">
      <div class="blog-content">
        <span class="category">${post.category || 'Uncategorized'}</span>
        <h3>${post.title}</h3>
        <p>${post.excerpt || truncate(stripHtml(post.content), 100)}</p>
        <div class="blog-footer">
          <a href="/blog/${post.slug}.html" class="read-more">Read More →</a>
        </div>
      </div>
    </article>
  `).join('');
}

/**
 * Render featured projects on home page
 */
function renderFeaturedProjects(projects) {
  const container = document.querySelector('.projects-grid');
  if (!container) return;

  container.innerHTML = projects.slice(0, 6).map(project => `
    <div class="project-card">
      ${project.imageUrl ? `
        <img src="${project.imageUrl}" alt="${project.title}" loading="lazy">
      ` : ''}
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tech">
          ${(project.technologies || []).slice(0, 4).map(tech =>
            `<span class="tech-tag">${tech}</span>`
          ).join('')}
        </div>
        <div class="project-links">
          ${project.githubUrl ? `
            <a href="${project.githubUrl}" target="_blank" rel="noopener">
              <i class="fab fa-github"></i> Code
            </a>
          ` : ''}
          ${project.liveUrl ? `
            <a href="${project.liveUrl}" target="_blank" rel="noopener">
              <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Handle contact form submission
 */
window.handleContactSubmit = async function(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  // Get form data
  const formData = {
    name: form.name.value,
    email: form.email.value,
    subject: form.subject?.value || '',
    message: form.message.value
  };

  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const result = await submitContactForm(formData);

    if (result.success) {
      // Show success message
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
    } else {
      showNotification(result.error || 'Failed to send message', 'error');
    }
  } catch (error) {
    showNotification('An error occurred. Please try again.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
};

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
    color: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

/**
 * Utility: Format date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Utility: Truncate text
 */
function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength).trim() + '...';
}

/**
 * Utility: Strip HTML tags
 */
function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

console.log('✅ Backend Integration Module loaded');
console.log('  - Blog API ready');
console.log('  - Projects API ready');
console.log('  - Contact API ready');
