'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export function DatabaseStatus({ loading = false }: { loading?: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const connecting = loading || pending;
  return (
    <main className="shell database-status">
      <span className="database-symbol" aria-hidden="true">✳</span>
      <p className="eyebrow">THAARAKENTH / PORTFOLIO</p>
      <h1>{connecting ? 'Connecting to database.' : 'Portfolio coming online.'}</h1>
      <p role="status">{connecting ? 'Loading the latest content. Please wait a moment.' : 'The portfolio is temporarily unavailable. Please check back shortly.'}</p>
      {!loading && <button className="button primary" disabled={pending} onClick={() => startTransition(() => router.refresh())}>{pending ? 'Connecting…' : 'Try again ↗'}</button>}
    </main>
  );
}
