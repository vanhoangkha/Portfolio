/**
 * Check Database Data
 * Quick script to view database statistics
 */

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../resource';
import outputs from '../../../amplify_outputs.json';

// Configure Amplify
Amplify.configure(outputs);

// Generate GraphQL client
const client = generateClient<Schema>();

async function checkData() {
  console.log('📊 Checking database statistics...\n');

  try {
    const stats = {
      blogPosts: 0,
      projects: 0,
      skills: 0,
      certifications: 0,
      achievements: 0,
      communityActivities: 0,
      contactSubmissions: 0,
    };

    // Blog Posts
    const { data: posts } = await client.models.BlogPost.list();
    stats.blogPosts = posts.length;
    console.log(`📝 Blog Posts: ${stats.blogPosts}`);
    if (stats.blogPosts > 0) {
      const published = posts.filter((p) => p.published).length;
      const featured = posts.filter((p) => p.featured).length;
      console.log(`   - Published: ${published}`);
      console.log(`   - Featured: ${featured}`);
    }

    // Projects
    const { data: projects } = await client.models.Project.list();
    stats.projects = projects.length;
    console.log(`\n🚀 Projects: ${stats.projects}`);
    if (stats.projects > 0) {
      const featured = projects.filter((p) => p.featured).length;
      const completed = projects.filter((p) => p.status === 'completed').length;
      console.log(`   - Featured: ${featured}`);
      console.log(`   - Completed: ${completed}`);
    }

    // Skills
    const { data: skills } = await client.models.Skill.list();
    stats.skills = skills.length;
    console.log(`\n💻 Skills: ${stats.skills}`);
    if (stats.skills > 0) {
      const categories = [...new Set(skills.map((s) => s.category))];
      console.log(`   - Categories: ${categories.join(', ')}`);
    }

    // Certifications
    const { data: certs } = await client.models.Certification.list();
    stats.certifications = certs.length;
    console.log(`\n🎓 Certifications: ${stats.certifications}`);

    // Achievements
    const { data: achievements } = await client.models.Achievement.list();
    stats.achievements = achievements.length;
    console.log(`\n🏆 Achievements: ${stats.achievements}`);

    // Community Activities
    const { data: activities } = await client.models.CommunityActivity.list();
    stats.communityActivities = activities.length;
    console.log(`\n👥 Community Activities: ${stats.communityActivities}`);

    // Contact Submissions
    const { data: contacts } = await client.models.ContactSubmission.list();
    stats.contactSubmissions = contacts.length;
    console.log(`\n📧 Contact Submissions: ${stats.contactSubmissions}`);
    if (stats.contactSubmissions > 0) {
      const newSubmissions = contacts.filter((c) => c.status === 'new').length;
      console.log(`   - New: ${newSubmissions}`);
    }

    const total = Object.values(stats).reduce((a, b) => a + b, 0);
    console.log(`\n📈 Total Records: ${total}`);

    if (total === 0) {
      console.log('\n⚠️  Database is empty. Run "npm run seed" to populate with sample data.');
    } else {
      console.log('\n✅ Database has data!');
    }
  } catch (error) {
    console.error('❌ Error checking database:', error);
    process.exit(1);
  }
}

checkData().catch(console.error);
