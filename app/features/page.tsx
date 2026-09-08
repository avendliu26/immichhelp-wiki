import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Features', description: 'Feature guides are published as research is completed.', robots: { index: false, follow: true } };
export default function Features(){return <main className="container section"><div className="eyebrow">Features</div><h1>Feature research</h1><p className="article-lead">Feature pages are published only after the research library contains enough version-specific evidence. The current batch focuses on setup, storage, backup, and troubleshooting.</p></main>}
