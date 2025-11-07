/**
 * Database Seeding Script
 * Run this to populate DynamoDB with initial data
 *
 * Usage:
 *   npx tsx amplify/data/seeds/seed-database.ts
 */

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../resource';
import outputs from '../../../amplify_outputs.json';
import {
  blogPosts,
  projects,
  skills,
  certifications,
  achievements,
  communityActivities,
} from './seed-data';

// Configure Amplify
Amplify.configure(outputs);

// Generate GraphQL client
const client = generateClient<Schema>();

async function seedBlogPosts() {
  console.log('\n📝 Seeding Blog Posts...');
  for (const post of blogPosts) {
    try {
      const { data, errors } = await client.models.BlogPost.create(post);
      if (errors) {
        console.error(`❌ Error creating blog post "${post.title}":`, errors);
      } else {
        console.log(`✅ Created blog post: ${post.title}`);
      }
    } catch (error) {
      console.error(`❌ Failed to create blog post "${post.title}":`, error);
    }
  }
}

async function seedProjects() {
  console.log('\n🚀 Seeding Projects...');
  for (const project of projects) {
    try {
      const { data, errors } = await client.models.Project.create(project);
      if (errors) {
        console.error(`❌ Error creating project "${project.title}":`, errors);
      } else {
        console.log(`✅ Created project: ${project.title}`);
      }
    } catch (error) {
      console.error(`❌ Failed to create project "${project.title}":`, error);
    }
  }
}

async function seedSkills() {
  console.log('\n💻 Seeding Skills...');
  for (const skill of skills) {
    try {
      const { data, errors } = await client.models.Skill.create(skill);
      if (errors) {
        console.error(`❌ Error creating skill "${skill.name}":`, errors);
      } else {
        console.log(`✅ Created skill: ${skill.name}`);
      }
    } catch (error) {
      console.error(`❌ Failed to create skill "${skill.name}":`, error);
    }
  }
}

async function seedCertifications() {
  console.log('\n🎓 Seeding Certifications...');
  for (const cert of certifications) {
    try {
      const { data, errors } = await client.models.Certification.create(cert);
      if (errors) {
        console.error(`❌ Error creating certification "${cert.name}":`, errors);
      } else {
        console.log(`✅ Created certification: ${cert.name}`);
      }
    } catch (error) {
      console.error(`❌ Failed to create certification "${cert.name}":`, error);
    }
  }
}

async function seedAchievements() {
  console.log('\n🏆 Seeding Achievements...');
  for (const achievement of achievements) {
    try {
      const { data, errors } = await client.models.Achievement.create(achievement);
      if (errors) {
        console.error(`❌ Error creating achievement "${achievement.title}":`, errors);
      } else {
        console.log(`✅ Created achievement: ${achievement.title}`);
      }
    } catch (error) {
      console.error(`❌ Failed to create achievement "${achievement.title}":`, error);
    }
  }
}

async function seedCommunityActivities() {
  console.log('\n👥 Seeding Community Activities...');
  for (const activity of communityActivities) {
    try {
      const { data, errors } = await client.models.CommunityActivity.create(activity);
      if (errors) {
        console.error(`❌ Error creating activity "${activity.title}":`, errors);
      } else {
        console.log(`✅ Created activity: ${activity.title}`);
      }
    } catch (error) {
      console.error(`❌ Failed to create activity "${activity.title}":`, error);
    }
  }
}

async function verifyData() {
  console.log('\n📊 Verifying seeded data...\n');

  const stats = {
    blogPosts: 0,
    projects: 0,
    skills: 0,
    certifications: 0,
    achievements: 0,
    communityActivities: 0,
  };

  try {
    const { data: posts } = await client.models.BlogPost.list();
    stats.blogPosts = posts.length;

    const { data: projs } = await client.models.Project.list();
    stats.projects = projs.length;

    const { data: skillsList } = await client.models.Skill.list();
    stats.skills = skillsList.length;

    const { data: certs } = await client.models.Certification.list();
    stats.certifications = certs.length;

    const { data: ach } = await client.models.Achievement.list();
    stats.achievements = ach.length;

    const { data: comm } = await client.models.CommunityActivity.list();
    stats.communityActivities = comm.length;

    console.log('📈 Database Statistics:');
    console.log(`   Blog Posts: ${stats.blogPosts}`);
    console.log(`   Projects: ${stats.projects}`);
    console.log(`   Skills: ${stats.skills}`);
    console.log(`   Certifications: ${stats.certifications}`);
    console.log(`   Achievements: ${stats.achievements}`);
    console.log(`   Community Activities: ${stats.communityActivities}`);
    console.log(`\n   Total Records: ${Object.values(stats).reduce((a, b) => a + b, 0)}`);
  } catch (error) {
    console.error('❌ Error verifying data:', error);
  }
}

async function clearDatabase() {
  console.log('\n🗑️  Clearing existing data...');

  try {
    // Clear all tables
    const tables = [
      'BlogPost',
      'Project',
      'Skill',
      'Certification',
      'Achievement',
      'CommunityActivity',
    ];

    for (const table of tables) {
      const { data } = await (client.models as any)[table].list();
      for (const item of data) {
        await (client.models as any)[table].delete({ id: item.id });
      }
      console.log(`✅ Cleared ${table} table (${data.length} records)`);
    }
  } catch (error) {
    console.error('❌ Error clearing database:', error);
  }
}

async function main() {
  console.log('🌱 Starting database seeding...\n');
  console.log('⚠️  This will populate your DynamoDB tables with sample data.');
  console.log('⚠️  Make sure you are connected to the correct environment.\n');

  const args = process.argv.slice(2);
  const shouldClear = args.includes('--clear');

  if (shouldClear) {
    await clearDatabase();
    console.log('\n');
  }

  try {
    await seedBlogPosts();
    await seedProjects();
    await seedSkills();
    await seedCertifications();
    await seedAchievements();
    await seedCommunityActivities();

    console.log('\n✅ Database seeding completed!\n');

    await verifyData();
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeder
main().catch(console.error);
