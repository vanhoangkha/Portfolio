// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: 'Building Multi-Cloud Architectures: Lessons from the Field',
        excerpt: 'Exploring best practices and real-world challenges when designing solutions that span AWS, Azure, and GCP. Learn from actual enterprise implementations.',
        category: 'Cloud Architecture',
        categorySlug: 'cloud',
        date: 'Jan 15, 2025',
        readTime: '5 min read',
        tags: ['Multi-Cloud', 'Architecture', 'Best Practices'],
        icon: 'fa-cloud'
    },
    {
        id: 2,
        title: 'Implementing RAG Systems with AWS Bedrock',
        excerpt: 'A comprehensive guide to building production-ready Retrieval-Augmented Generation systems using AWS Bedrock, with code examples and optimization tips.',
        category: 'AI & ML',
        categorySlug: 'ai',
        date: 'Jan 10, 2025',
        readTime: '8 min read',
        tags: ['GenAI', 'RAG', 'AWS Bedrock'],
        icon: 'fa-brain'
    },
    {
        id: 3,
        title: 'Zero-Trust Security in Kubernetes: A Practical Guide',
        excerpt: 'Implementing zero-trust security principles in Kubernetes environments. Real-world patterns for securing EKS clusters in regulated industries.',
        category: 'DevSecOps',
        categorySlug: 'devsecops',
        date: 'Jan 5, 2025',
        readTime: '6 min read',
        tags: ['Security', 'Kubernetes', 'Zero-Trust'],
        icon: 'fa-shield-alt'
    },
    {
        id: 4,
        title: 'Growing a Tech Community to 45K+ Members: Key Learnings',
        excerpt: 'Reflections on building and scaling AWS Study Group. What worked, what didn\'t, and lessons for aspiring community leaders.',
        category: 'Community',
        categorySlug: 'community',
        date: 'Dec 28, 2024',
        readTime: '4 min read',
        tags: ['Community', 'Leadership', 'Growth'],
        icon: 'fa-users'
    },
    {
        id: 5,
        title: 'Multi-Agent AI Systems: The Future of Cloud Operations',
        excerpt: 'How agentic AI is transforming cloud operations. Insights from building CloudThinker and orchestrating autonomous agents at scale.',
        category: 'Innovation',
        categorySlug: 'ai',
        date: 'Dec 20, 2024',
        readTime: '7 min read',
        tags: ['AI Agents', 'Automation', 'Innovation'],
        icon: 'fa-lightbulb'
    },
    {
        id: 6,
        title: 'From Junior Engineer to Cloud Architect: My Journey',
        excerpt: 'The path that led me from telecommunications engineering to cloud architecture. Key decisions, certifications, and advice for aspiring cloud professionals.',
        category: 'Career',
        categorySlug: 'career',
        date: 'Dec 15, 2024',
        readTime: '5 min read',
        tags: ['Career', 'Advice', 'Cloud'],
        icon: 'fa-rocket'
    },
    {
        id: 7,
        title: 'Serverless at Scale: Lessons from Production',
        excerpt: 'Building and operating serverless applications at enterprise scale. Real-world challenges, solutions, and best practices from the trenches.',
        category: 'Cloud Architecture',
        categorySlug: 'cloud',
        date: 'Dec 10, 2024',
        readTime: '6 min read',
        tags: ['Serverless', 'AWS Lambda', 'Scale'],
        icon: 'fa-cloud'
    },
    {
        id: 8,
        title: 'Cost Optimization Strategies for Cloud Workloads',
        excerpt: 'Practical techniques to reduce cloud costs by 30-40% without compromising performance. From rightsizing to reserved instances and spot instances.',
        category: 'Cloud Architecture',
        categorySlug: 'cloud',
        date: 'Dec 5, 2024',
        readTime: '7 min read',
        tags: ['Cost Optimization', 'FinOps', 'AWS'],
        icon: 'fa-cloud'
    },
    {
        id: 9,
        title: 'GitOps: The Future of Kubernetes Deployments',
        excerpt: 'Implementing GitOps workflows with ArgoCD and Flux. How to achieve declarative, version-controlled infrastructure and application delivery.',
        category: 'DevSecOps',
        categorySlug: 'devsecops',
        date: 'Nov 28, 2024',
        readTime: '8 min read',
        tags: ['GitOps', 'Kubernetes', 'ArgoCD'],
        icon: 'fa-shield-alt'
    }
];

// Render blog posts
function renderBlogPosts(posts) {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    blogGrid.innerHTML = posts.map(post => `
        <article class="blog-card" data-category="${post.categorySlug}">
            <div class="blog-image">
                <div class="blog-category">${post.category}</div>
                <div class="blog-icon">
                    <i class="fas ${post.icon}"></i>
                </div>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date"><i class="far fa-calendar"></i> ${post.date}</span>
                    <span class="blog-read-time"><i class="far fa-clock"></i> ${post.readTime}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-tags">
                    ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                </div>
                <a href="blog.html#post-${post.id}" class="blog-read-more">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `).join('');

    // Add animation on scroll
    observeBlogCards();
}

// Filter functionality
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter posts
            if (filter === 'all') {
                renderBlogPosts(blogPosts);
            } else {
                const filtered = blogPosts.filter(post => post.categorySlug === filter);
                renderBlogPosts(filtered);
            }
        });
    });
}

// Observe blog cards for animation
function observeBlogCards() {
    const cards = document.querySelectorAll('.blog-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Handle blog post navigation
function handleBlogPostNavigation() {
    const hash = window.location.hash;

    if (hash && hash.startsWith('#post-')) {
        // Hide blog grid and filters
        const blogGrid = document.getElementById('blogGrid');
        const filtersSection = document.querySelector('.blog-filters');

        if (blogGrid) blogGrid.parentElement.style.display = 'none';
        if (filtersSection) filtersSection.parentElement.style.display = 'none';

        // Show the specific blog post
        const postSection = document.querySelector(hash);
        if (postSection) {
            postSection.style.display = 'block';
            // Scroll to top of post
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }
    } else {
        // Show blog grid and filters
        const blogGrid = document.getElementById('blogGrid');
        const filtersSection = document.querySelector('.blog-filters');

        if (blogGrid) blogGrid.parentElement.style.display = 'block';
        if (filtersSection) filtersSection.parentElement.style.display = 'block';

        // Hide all blog post sections
        document.querySelectorAll('.blog-post').forEach(section => {
            section.style.display = 'none';
        });

        // Render blog posts if not already rendered
        if (blogGrid && blogGrid.children.length === 0) {
            renderBlogPosts(blogPosts);
        }
    }
}

// Share functionality
function setupShareButtons() {
    document.querySelectorAll('.blog-share-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = window.location.href;
            const title = document.querySelector('.blog-post-title')?.textContent || 'Check out this blog post';

            if (btn.querySelector('.fa-twitter')) {
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
            } else if (btn.querySelector('.fa-linkedin')) {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
            } else if (btn.querySelector('.fa-facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
            } else if (btn.querySelector('.fa-link')) {
                // Copy to clipboard
                navigator.clipboard.writeText(url).then(() => {
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                    }, 2000);
                });
            }
        });
    });
}

// Blog Search Functionality
function setupBlogSearch() {
    const searchInput = document.getElementById('blogSearch');
    const searchClearBtn = document.getElementById('searchClearBtn');
    const searchResults = document.getElementById('searchResults');

    if (!searchInput) return;

    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        // Show/hide clear button
        searchClearBtn.style.display = query ? 'flex' : 'none';

        // Debounce search
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (query.length >= 2) {
                const results = searchBlogPosts(query);
                displaySearchResults(results);
            } else if (query.length === 0) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
                renderBlogPosts(blogPosts); // Show all posts
            }
        }, 300);
    });

    // Clear button
    searchClearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchClearBtn.style.display = 'none';
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        renderBlogPosts(blogPosts);
    });
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');

    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search"></i>
                <p>No posts found matching your search</p>
            </div>
        `;
        searchResults.style.display = 'block';
        renderBlogPosts([]);
    } else {
        searchResults.innerHTML = `
            <div class="search-results-count">
                Found ${results.length} post${results.length !== 1 ? 's' : ''}
            </div>
        `;
        searchResults.style.display = 'block';
        renderBlogPosts(results);
    }
}

// Reading Progress Indicator
function setupReadingProgress() {
    const progressBar = document.getElementById('readingProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        // Only show progress when viewing a blog post
        const isViewingPost = window.location.hash.startsWith('#post-');

        if (isViewingPost) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;

            progressBar.style.width = scrolled + '%';
            progressBar.parentElement.style.display = 'block';
        } else {
            progressBar.parentElement.style.display = 'none';
        }
    });
}

// Table of Contents Generator for Blog Posts
function generateTableOfContents() {
    const blogPost = document.querySelector('.blog-post[style*="display: block"] .blog-post-body');
    if (!blogPost) return;

    const headings = blogPost.querySelectorAll('h2, h3');
    if (headings.length === 0) return;

    const toc = document.createElement('div');
    toc.className = 'blog-toc';
    toc.innerHTML = '<h4><i class="fas fa-list"></i> Table of Contents</h4><ul></ul>';

    const tocList = toc.querySelector('ul');

    headings.forEach((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;

        const li = document.createElement('li');
        li.className = heading.tagName.toLowerCase();

        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        li.appendChild(link);
        tocList.appendChild(li);
    });

    // Insert TOC after blog post header
    const postHeader = blogPost.previousElementSibling;
    postHeader.parentNode.insertBefore(toc, blogPost);
}

// Estimated Reading Time Calculator
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
}

// Copy Code Block Functionality
function setupCodeCopyButtons() {
    document.querySelectorAll('pre code').forEach((codeBlock) => {
        const pre = codeBlock.parentElement;

        // Create copy button
        const button = document.createElement('button');
        button.className = 'code-copy-btn';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.title = 'Copy code';

        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.classList.add('copied');

                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
            }
        });

        pre.style.position = 'relative';
        pre.appendChild(button);
    });
}

// Lazy Load Images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    // Handle navigation on page load
    handleBlogPostNavigation();

    // Setup filters
    setupFilters();

    // Setup search
    setupBlogSearch();

    // Setup reading progress
    setupReadingProgress();

    // Setup share buttons
    setupShareButtons();

    // Setup code copy buttons
    setupCodeCopyButtons();

    // Setup lazy loading
    setupLazyLoading();

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
        handleBlogPostNavigation();
        generateTableOfContents();
        setupCodeCopyButtons();
    });

    // Add smooth scroll to blog post links
    document.querySelectorAll('a[href^="blog.html#post-"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const hash = href.split('#')[1];
            window.location.hash = hash;
        });
    });

    // Generate TOC if viewing a post
    if (window.location.hash.startsWith('#post-')) {
        setTimeout(() => {
            generateTableOfContents();
            setupCodeCopyButtons();
        }, 100);
    }
}

// Search functionality (if needed in future)
function searchBlogPosts(query) {
    const lowerQuery = query.toLowerCase();
    return blogPosts.filter(post =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { blogPosts, searchBlogPosts };
}
