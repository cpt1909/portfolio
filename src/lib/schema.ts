import { z } from 'zod';

// Validate database content before it reaches the UI, including external URLs.
const webUrl = z.url().refine((url) => /^https?:\/\//i.test(url), 'Use an HTTP(S) URL');
const optionalUrl = z.union([webUrl, z.literal('')]).default('');
const base = { id: z.string().min(1), order: z.number().default(0) };
export const profileSchema = z.object({
  id: z.literal('main'), name: z.string(), role: z.string(), intro: z.string(), about: z.string(),
  availability: z.string(), resumeUrl: optionalUrl, skills: z.array(z.string()),
});
export const projectSchema = z.object({
  ...base, title: z.string(), category: z.enum(['AI / ML', 'Full stack', 'Open source']),
  description: z.string(), stack: z.array(z.string()), github: optionalUrl, live: optionalUrl,
  visual: z.enum(['orbit', 'wave', 'grid', 'terminal']),
  imageURL: optionalUrl.optional(),
});
export const entrySchema = z.object({ ...base, title: z.string(), organization: z.string(), period: z.string(), description: z.string() });
export const technologySchema = z.object({ ...base, name: z.string(), category: z.string(), symbol: z.string() });
// New platforms need only a document; unrecognized icon names use a globe.
export const socialSchema = z.object({
  ...base, label: z.string().trim().min(1), icon: z.string().default('globe'), value: z.string().default(''),
  url: z.union([webUrl, z.string().startsWith('mailto:').refine((value) => z.email().safeParse(value.slice(7)).success, 'Use mailto: followed by a valid email address')]),
});
export type Profile = z.infer<typeof profileSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Entry = z.infer<typeof entrySchema>;
export type Technology = z.infer<typeof technologySchema>;
export type Social = z.infer<typeof socialSchema>;
export interface Portfolio { profile: Profile; projects: Project[]; experience: Entry[]; education: Entry[]; technologies: Technology[]; achievements: Entry[]; socials: Social[] }
