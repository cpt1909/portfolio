import { test } from 'node:test';
import assert from 'node:assert/strict';
import { selectContentSource } from '../src/lib/content-source';
import { sampleData } from '../src/lib/sample-data';
import { profileSchema, projectSchema, entrySchema, technologySchema, socialSchema } from '../src/lib/schema';

test('only literal true selects samples and skips database access', async () => {
  assert.equal(await selectContentSource('true', async () => { throw new Error('Must not connect'); }, async () => 'sample'), 'sample');
});
test('false, unset, and other values use the database exclusively', async () => {
  for (const flag of ['false', undefined, '', 'TRUE', '1', ' true ']) {
    assert.equal(await selectContentSource(flag, async () => 'database', async () => { throw new Error('Must not load samples'); }), 'database');
  }
});
test('database failure or missing content never falls back to samples', async () => {
  const sample = async () => { throw new Error('Must not load samples'); };
  assert.equal(await selectContentSource('false', async () => null, sample), null);
  await assert.rejects(selectContentSource('false', async () => { throw new Error('Connection failed'); }, sample), /Connection failed/);
});
test('preview content matches every database content schema', () => {
  profileSchema.parse(sampleData.profile);
  projectSchema.array().parse(sampleData.projects);
  for (const entries of [sampleData.experience, sampleData.education, sampleData.achievements]) entrySchema.array().parse(entries);
  technologySchema.array().parse(sampleData.technologies);
  socialSchema.array().parse(sampleData.socials);
});
