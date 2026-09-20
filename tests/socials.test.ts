import { test } from 'node:test';
import assert from 'node:assert/strict';
import { socialSchema } from '../src/lib/schema';

// Test-only inputs; never imported into the website or database setup script.
test('email and arbitrary future platforms are valid social links', () => {
  assert.ok(socialSchema.safeParse({ id: 'email', label: 'Email', url: 'mailto:test@example.com' }).success);
  const custom = socialSchema.parse({ id: 'custom', label: 'Community', url: 'https://example.com/profile', icon: 'custom' });
  assert.equal(custom.icon, 'custom');
});
test('unsafe links and invalid email addresses are rejected', () => {
  for (const url of ['javascript:alert(1)', 'data:text/html,hello', 'mailto:invalid', 'mailto:test@example.com?bcc=other@example.com', 'ftp://example.com', '']) {
    assert.equal(socialSchema.safeParse({ id: 'invalid', label: 'Invalid', url }).success, false, url);
  }
});
