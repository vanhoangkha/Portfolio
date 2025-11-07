// Search and Filter Implementation

class SearchFilterUI {
    constructor() {
        this.searchManager = portfolioUtils.search;
        this.initSearchBar();
        this.initFilters();
    }

    initSearchBar() {
        // Create global search bar
        const searchHTML = `
            <div class="global-search-container" id="globalSearchContainer">
                <div class="search-wrapper">
                    <i class="fas fa-search search-icon"></i>
                    <input
                        type="text"
                        class="search-input"
                        id="globalSearchInput"
                        placeholder="Search skills, projects, blog posts..."
                        autocomplete="off"
                    />
                    <button class="search-clear" id="searchClearBtn" style="display: none;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="search-results" id="searchResults" style="display: none;"></div>
            </div>
        `;

        // Insert after navbar
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.insertAdjacentHTML('afterend', searchHTML);
            this.attachSearchListeners();
        }
    }

    attachSearchListeners() {
        const searchInput = document.getElementById('globalSearchInput');
        const clearBtn = document.getElementById('searchClearBtn');
        const resultsContainer = document.getElementById('searchResults');

        if (!searchInput) return;

        // Debounced search
        const debouncedSearch = portfolioUtils.debounce((query) => {
            this.performSearch(query);
        }, 300);

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();

            if (query.length > 0) {
                clearBtn.style.display = 'block';
                debouncedSearch(query);
            } else {
                clearBtn.style.display = 'none';
                resultsContainer.style.display = 'none';
            }
        });

        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            resultsContainer.style.display = 'none';
            searchInput.focus();
        });

        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.global-search-container')) {
                resultsContainer.style.display = 'none';
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }

            // Escape to close
            if (e.key === 'Escape') {
                resultsContainer.style.display = 'none';
                searchInput.blur();
            }
        });
    }

    performSearch(query) {
        const results = this.searchManager.search(query);
        this.displaySearchResults(results, query);
    }

    displaySearchResults(results, query) {
        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) return;

        const totalResults =
            (results.skills?.length || 0) +
            (results.projects?.length || 0) +
            (results.blog?.length || 0);

        if (totalResults === 0) {
            resultsContainer.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <p>No results found for "${query}"</p>
                </div>
            `;
            resultsContainer.style.display = 'block';
            return;
        }

        let html = '<div class="search-results-list">';

        // Skills results
        if (results.skills && results.skills.length > 0) {
            html += `<div class="search-category">
                <h4 class="search-category-title">
                    <i class="fas fa-code"></i> Skills (${results.skills.length})
                </h4>`;
            results.skills.slice(0, 5).forEach(skill => {
                html += `
                    <a href="#skills" class="search-result-item" onclick="searchFilterUI.highlightItem('skill-${skill.id}')">
                        <div class="result-icon"><i class="${skill.icon || 'fas fa-circle'}"></i></div>
                        <div class="result-content">
                            <div class="result-title">${this.highlightMatch(skill.name, query)}</div>
                            <div class="result-subtitle">${skill.subcategory} • ${skill.proficiency}</div>
                        </div>
                    </a>
                `;
            });
            html += '</div>';
        }

        // Projects results
        if (results.projects && results.projects.length > 0) {
            html += `<div class="search-category">
                <h4 class="search-category-title">
                    <i class="fas fa-folder"></i> Projects (${results.projects.length})
                </h4>`;
            results.projects.slice(0, 5).forEach(project => {
                html += `
                    <a href="#projects" class="search-result-item" onclick="searchFilterUI.highlightItem('project-${project.id}')">
                        <div class="result-icon"><i class="fas fa-rocket"></i></div>
                        <div class="result-content">
                            <div class="result-title">${this.highlightMatch(project.title, query)}</div>
                            <div class="result-subtitle">${project.short_description}</div>
                        </div>
                    </a>
                `;
            });
            html += '</div>';
        }

        // Blog results
        if (results.blog && results.blog.length > 0) {
            html += `<div class="search-category">
                <h4 class="search-category-title">
                    <i class="fas fa-blog"></i> Blog Posts (${results.blog.length})
                </h4>`;
            results.blog.slice(0, 5).forEach(post => {
                html += `
                    <a href="blog.html?post=${post.slug}" class="search-result-item">
                        <div class="result-icon"><i class="fas fa-file-alt"></i></div>
                        <div class="result-content">
                            <div class="result-title">${this.highlightMatch(post.title, query)}</div>
                            <div class="result-subtitle">${post.category}</div>
                        </div>
                    </a>
                `;
            });
            html += '</div>';
        }

        html += '</div>';

        resultsContainer.innerHTML = html;
        resultsContainer.style.display = 'block';
    }

    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    highlightItem(itemId) {
        // Close search results
        document.getElementById('searchResults').style.display = 'none';

        // Wait for scroll, then highlight
        setTimeout(() => {
            const element = document.querySelector(`[data-id="${itemId}"]`);
            if (element) {
                element.classList.add('highlight-pulse');
                setTimeout(() => {
                    element.classList.remove('highlight-pulse');
                }, 2000);
            }
        }, 500);
    }

    initFilters() {
        // Add filter buttons to sections
        this.addSkillsFilter();
        this.addProjectsFilter();
    }

    addSkillsFilter() {
        const skillsSection = document.querySelector('#skills .section-header');
        if (!skillsSection) return;

        const filterHTML = `
            <div class="section-filters">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="technical">Technical</button>
                <button class="filter-btn" data-filter="soft">Soft Skills</button>
                <button class="filter-btn" data-filter="expert">Expert Only</button>
            </div>
        `;

        skillsSection.insertAdjacentHTML('beforeend', filterHTML);

        // Add filter listeners
        document.querySelectorAll('#skills .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                document.querySelectorAll('#skills .filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // Filter skills
                const filter = e.target.dataset.filter;
                this.filterSkills(filter);
            });
        });
    }

    filterSkills(filter) {
        const skillCategories = document.querySelectorAll('.skill-category');

        skillCategories.forEach(category => {
            const skills = category.querySelectorAll('.skill-item');

            if (filter === 'all') {
                category.style.display = 'block';
                skills.forEach(skill => skill.style.display = 'block');
                return;
            }

            if (filter === 'technical') {
                // Check if this is a technical category (not soft skills)
                const isText = category.querySelector('.skill-category-title')?.textContent;
                if (isSoftSkills && isSoftSkills.includes('Soft')) {
                    category.style.display = 'none';
                } else {
                    category.style.display = 'block';
                    skills.forEach(skill => skill.style.display = 'block');
                }
            } else if (filter === 'soft') {
                const isText = category.querySelector('.skill-category-title')?.textContent;
                if (isText && isText.includes('Soft')) {
                    category.style.display = 'block';
                    skills.forEach(skill => skill.style.display = 'block');
                } else {
                    category.style.display = 'none';
                }
            } else if (filter === 'expert') {
                category.style.display = 'block';
                skills.forEach(skill => {
                    if (skill.dataset.proficiency === 'expert') {
                        skill.style.display = 'block';
                    } else {
                        skill.style.display = 'none';
                    }
                });
            }
        });
    }

    addProjectsFilter() {
        const projectsSection = document.querySelector('#projects .section-header');
        if (!projectsSection) return;

        const filterHTML = `
            <div class="section-filters">
                <button class="filter-btn active" data-filter="all">All Projects</button>
                <button class="filter-btn" data-filter="featured">Featured</button>
            </div>
        `;

        projectsSection.insertAdjacentHTML('beforeend', filterHTML);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.searchFilterUI = new SearchFilterUI();
    console.log('✅ Search and filter initialized');
});
