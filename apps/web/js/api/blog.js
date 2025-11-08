import { generateClient } from 'aws-amplify/data';

const client = generateClient({
  authMode: 'identityPool'
});

/**
 * Fetch all published blog posts
 * @param {Object} options - Query options
 * @param {boolean} options.featuredOnly - Return only featured posts
 * @param {number} options.limit - Maximum number of posts to return
 * @returns {Promise<Array>} Array of blog posts
 */
export async function getBlogPosts({ featuredOnly = false, limit = null } = {}) {
  try {
    const { data, errors } = await client.models.BlogPost.list();

    if (errors) {
      console.error('Error fetching blog posts:', errors);
      return [];
    }

    // Filter and sort
    let posts = data.filter(post => post.published);

    if (featuredOnly) {
      posts = posts.filter(post => post.featured);
    }

    // Sort by publishedAt date (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt);
      const dateB = new Date(b.publishedAt || b.createdAt);
      return dateB - dateA;
    });

    // Apply limit if specified
    if (limit) {
      posts = posts.slice(0, limit);
    }

    return posts;
  } catch (error) {
    console.error('Exception fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} Blog post or null
 */
export async function getBlogPostBySlug(slug) {
  try {
    const { data, errors } = await client.models.BlogPost.list();

    if (errors) {
      console.error('Error fetching blog post:', errors);
      return null;
    }

    const post = data.find(p => p.slug === slug && p.published);
    return post || null;
  } catch (error) {
    console.error('Exception fetching blog post:', error);
    return null;
  }
}

/**
 * Increment view count for a blog post
 * @param {string} id - Post ID
 */
export async function incrementViewCount(id) {
  try {
    const { data } = await client.models.BlogPost.get({ id });
    if (data) {
      const currentCount = data.viewCount || 0;
      await client.models.BlogPost.update({
        id,
        viewCount: currentCount + 1
      });
    }
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
}

/**
 * Get blog categories with post counts
 * @returns {Promise<Array>} Array of categories
 */
export async function getBlogCategories() {
  try {
    const posts = await getBlogPosts();
    const categoryCounts = {};

    posts.forEach(post => {
      if (post.category) {
        categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
      }
    });

    return Object.entries(categoryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
