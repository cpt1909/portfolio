import 'server-only';
import { cache } from 'react';
import { getDatabase } from './mongodb';
import { selectContentSource } from './content-source';
import { profileSchema, projectSchema, entrySchema, technologySchema, socialSchema, type Portfolio } from './schema';

// Deduplicate reads within a request, without persistently caching database content.
// Missing/failed database content always returns null; it never selects samples.
async function getDatabasePortfolio(): Promise<Portfolio | null> {
  if (!process.env.MONGODB_URI) return null;
  try {
    const db = await getDatabase();
    // Exclude legacy sample records and allow individual documents to be hidden.
    const visible = { sample: { $ne: true }, published: { $ne: false } };
    const [profile, projects, experience, education, technologies, achievements, socials] = await Promise.all([
      db.collection('profile').findOne({ id: 'main', ...visible }),
      ...['projects', 'experience', 'education', 'technologies', 'achievements', 'socials'].map((name) =>
        db.collection(name).find(visible, { projection: { _id: 0 } }).sort({ order: 1, id: 1 }).toArray()),
    ]);
    if (!profile) return null;
    return {
      profile: profileSchema.parse(profile), projects: projectSchema.array().parse(projects),
      experience: entrySchema.array().parse(experience), education: entrySchema.array().parse(education),
      technologies: technologySchema.array().parse(technologies), achievements: entrySchema.array().parse(achievements),
      socials: socialSchema.array().parse(socials),
    };
  } catch {
    // Keep credentials and database details out of both the page and logs.
    console.error('Portfolio content unavailable: check database connectivity and document schemas.');
    return null;
  }
}

export const getPortfolio = cache(() => selectContentSource<Portfolio | null>(
  process.env.USE_SAMPLE_DATA,
  getDatabasePortfolio,
  async () => (await import('./sample-data')).sampleData,
));
