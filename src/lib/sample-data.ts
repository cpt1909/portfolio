import type { Portfolio } from './schema';

// Preview-only examples. Never written to MongoDB or used as an outage fallback.
export const sampleData: Portfolio = {
  profile: {
    id: 'main', name: 'Thaarakenth', role: 'AI/ML Product Engineer',
    intro: 'Turning complex problems into intelligent, intuitive products. At the intersection of machine learning, thoughtful design, and a little bit of chaos.',
    about: 'I’m Thaarakenth, an AI/ML Product Engineer working with Python, GenAI, SQL, and React + Next.js. I explore how intelligent systems can become useful, thoughtful product experiences.',
    availability: 'Sample preview · Open to possibilities', resumeUrl: '', skills: ['Python', 'GenAI', 'SQL', 'React', 'Next.js'],
  },
  projects: [
    { id: 'sample-search', order: 1, title: 'Neural Search', category: 'AI / ML', description: 'Sample concept: conversational search that turns scattered knowledge into clear answers.', stack: ['Python', 'GenAI', 'Next.js'], github: '', live: '', visual: 'orbit' },
    { id: 'sample-query', order: 2, title: 'Query Lab', category: 'Full stack', description: 'Sample concept: a natural-language analytics workspace for exploring the story in your data.', stack: ['SQL', 'Python', 'React'], github: '', live: '', visual: 'wave' },
    { id: 'sample-agent', order: 3, title: 'Agent Kit', category: 'Open source', description: 'Sample concept: composable AI workflows and a developer-first tool interface.', stack: ['Python', 'GenAI', 'TypeScript'], github: '', live: '', visual: 'terminal' },
  ],
  experience: [{ id: 'sample-role', order: 1, title: 'AI/ML Product Engineer', organization: 'Sample organization', period: 'Sample experience', description: 'A preview of how your responsibilities and product contributions appear in the timeline.' }],
  education: [{ id: 'sample-education', order: 1, title: 'Computer Science', organization: 'Sample institution', period: 'Sample education', description: 'A preview of your qualifications, coursework, and research interests.' }],
  technologies: [
    { id: 'python', order: 1, name: 'Python', category: 'AI & backend', symbol: 'Py' },
    { id: 'genai', order: 2, name: 'GenAI', category: 'Intelligent systems', symbol: '✳' },
    { id: 'sql', order: 3, name: 'SQL', category: 'Data & analytics', symbol: '▤' },
    { id: 'react', order: 4, name: 'React', category: 'Interface engineering', symbol: '⚛' },
    { id: 'next', order: 5, name: 'Next.js', category: 'Full-stack web', symbol: 'N' },
  ],
  achievements: [{ id: 'sample-milestone', order: 1, title: 'A milestone worth sharing', organization: 'Sample achievement', period: '01', description: 'A preview of how certifications, open-source contributions, or awards appear.' }],
  socials: [
    { id: 'email', order: 1, label: 'Email', icon: 'email', value: 'Sample email', url: 'mailto:hello@example.com' },
    { id: 'linkedin', order: 2, label: 'LinkedIn', icon: 'linkedin', value: 'Sample link', url: 'https://example.com/linkedin' },
    { id: 'github', order: 3, label: 'GitHub', icon: 'github', value: 'Sample link', url: 'https://example.com/github' },
  ],
};
