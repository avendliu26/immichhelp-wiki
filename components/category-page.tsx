import Link from 'next/link';
import type { DocumentSummary } from '@/lib/content';

export function CategoryPage({ eyebrow, title, description, docs, related = [] }: { eyebrow: string; title: string; description: string; docs: DocumentSummary[]; related?: { title: string; href: string }[] }) {
  return <main className="container section category-page">
    <div className="eyebrow">{eyebrow}</div>
    <h1>{title}</h1>
    <p className="article-lead">{description}</p>
    <section className="category-section" aria-labelledby="available-guides">
      <div className="section-heading"><h2 id="available-guides">Available guides</h2><p>{docs.length} published {docs.length === 1 ? 'guide' : 'guides'}</p></div>
      <div className="card-grid">{docs.map((doc) => <Link className="card" href={`/${doc.slug}`} key={doc.slug}><div className="card-tag">{doc.category}</div><h3>{doc.title}</h3><p>{doc.description}</p>{doc.lastReviewed && <small className="card-meta">Last reviewed {doc.lastReviewed}</small>}</Link>)}</div>
    </section>
    {related.length > 0 && <section className="category-section" aria-labelledby="related-categories"><div className="section-heading"><h2 id="related-categories">Related categories</h2></div><div className="list-card">{related.map((item) => <Link href={item.href} key={item.href}>{item.title}<span>→</span></Link>)}</div></section>}
  </main>;
}
