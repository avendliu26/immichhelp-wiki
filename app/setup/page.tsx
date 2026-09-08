import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Immich Setup Guides', description: 'Install Immich with Docker Compose, check requirements, complete post-install steps, and follow safe update guidance from published sources.' };
import Link from 'next/link';
import { getPublishedDocuments } from '@/lib/content';
const officialLinks = [
  { title: 'Docker Compose installation', description: 'Immich’s recommended installation path using the official Compose files.', href: 'https://docs.immich.app/install/docker-compose/' },
  { title: 'Requirements', description: 'Check supported hardware, storage, and software requirements before installing.', href: 'https://docs.immich.app/install/requirements/' },
  { title: 'Post-installation steps', description: 'Complete the first admin, storage, and mobile setup after the server starts.', href: 'https://docs.immich.app/install/post-install/' },
];
export default function Setup() {
  const docs = getPublishedDocuments().filter((d) => d.category === 'Install & Setup');
  const platforms = getPublishedDocuments().filter((d) => d.category === 'Platforms');
  return <main className="container section category-page"><div className="eyebrow">Install &amp; Setup</div><h1>Setup</h1><p className="article-lead">Install, configure, verify, update, and roll back with confidence.</p>
    <section className="category-section" aria-labelledby="recommended-installation"><div className="section-heading"><h2 id="recommended-installation">Recommended Installation</h2></div><div className="card-grid">{docs.filter((doc) => doc.slug === 'setup/immich-docker-compose').map((doc) => <div className="card" key={doc.slug}><div className="card-tag">{doc.category}</div><h3>Immich Docker Compose</h3><p>{doc.description}</p>{doc.lastReviewed && <small className="card-meta">Last reviewed {doc.lastReviewed}</small>}<Link className="primary-button" style={{marginTop:16}} href={`/${doc.slug}`}>Start Installation Guide →</Link></div>)}</div></section>
    {docs.filter((doc) => doc.slug !== 'setup/immich-docker-compose').length > 0 && <section className="category-section" aria-labelledby="other-setup-guides"><div className="section-heading"><h2 id="other-setup-guides">Other setup guides</h2></div><div className="card-grid">{docs.filter((doc) => doc.slug !== 'setup/immich-docker-compose').map((doc) => <Link className="card" href={`/${doc.slug}`} key={doc.slug}><div className="card-tag">{doc.category}</div><h3>{doc.title}</h3><p>{doc.description}</p></Link>)}</div></section>}
    <section className="category-section" aria-labelledby="official-installation"><div className="section-heading"><h2 id="official-installation">Official Installation Documentation</h2></div><div className="card-grid">{officialLinks.map((link) => <a className="card" href={link.href} target="_blank" rel="noopener noreferrer" key={link.href}><div className="card-tag">Official Immich documentation · external</div><h3>{link.title} ↗</h3><p>{link.description}</p></a>)}</div></section>
    {platforms.length > 0 && <section className="category-section" aria-labelledby="other-platforms"><div className="section-heading"><h2 id="other-platforms">Other platforms</h2></div><div className="card-grid">{platforms.map((doc) => <Link className="card" href={`/${doc.slug}`} key={doc.slug}><div className="card-tag">{doc.category}</div><h3>{doc.title}</h3><p>{doc.description}</p>{doc.lastReviewed && <small className="card-meta">Last reviewed {doc.lastReviewed}</small>}</Link>)}</div></section>}
  </main>;
}
