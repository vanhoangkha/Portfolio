import { generateClient } from 'aws-amplify/data';

const client = generateClient({
  authMode: 'identityPool'
});

/**
 * Fetch all projects
 * @param {Object} options - Query options
 * @param {boolean} options.featuredOnly - Return only featured projects
 * @param {string} options.status - Filter by status (completed, in-progress, planned)
 * @param {number} options.limit - Maximum number of projects to return
 * @returns {Promise<Array>} Array of projects
 */
export async function getProjects({ featuredOnly = false, status = null, limit = null } = {}) {
  try {
    const { data, errors } = await client.models.Project.list();

    if (errors) {
      console.error('Error fetching projects:', errors);
      return [];
    }

    // Filter
    let projects = data;

    if (featuredOnly) {
      projects = projects.filter(project => project.featured);
    }

    if (status) {
      projects = projects.filter(project => project.status === status);
    }

    // Sort by creation date (newest first)
    projects.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });

    // Apply limit if specified
    if (limit) {
      projects = projects.slice(0, limit);
    }

    return projects;
  } catch (error) {
    console.error('Exception fetching projects:', error);
    return [];
  }
}

/**
 * Fetch a single project by slug
 * @param {string} slug - Project slug
 * @returns {Promise<Object|null>} Project or null
 */
export async function getProjectBySlug(slug) {
  try {
    const { data, errors } = await client.models.Project.list();

    if (errors) {
      console.error('Error fetching project:', errors);
      return null;
    }

    const project = data.find(p => p.slug === slug);
    return project || null;
  } catch (error) {
    console.error('Exception fetching project:', error);
    return null;
  }
}

/**
 * Get all unique technologies from projects
 * @returns {Promise<Array>} Array of technology names
 */
export async function getTechnologies() {
  try {
    const projects = await getProjects();
    const techSet = new Set();

    projects.forEach(project => {
      if (project.technologies) {
        project.technologies.forEach(tech => techSet.add(tech));
      }
    });

    return Array.from(techSet).sort();
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return [];
  }
}
