import Link from 'next/link';
import { ArrowRight, DatabaseBackup, Download, FolderOpen, RefreshCw, Server, Wrench } from 'lucide-react';
import { SearchDialog } from '@/components/search-dialog';
import { home } from '@/src/data/home';
import { helpPaths, type HelpPathIcon } from '@/src/data/help-paths';
import { getPublishedDocuments } from '@/lib/content';

const pathIcons = { Download, Wrench, DatabaseBackup, Server, FolderOpen, RefreshCw } satisfies Record<HelpPathIcon, typeof Download>;
const questions = [
  { title: 'Why won’t my images load?', note: 'Check originals, previews, and storage', href: '/troubleshooting/immich-error-loading-image', icon: Wrench },
  { title: 'What do I need to back up?', note: 'Protect the database and the actual files', href: '/backup/immich-backup', icon: DatabaseBackup },
  { title: 'How do I update safely?', note: 'Check your version and upgrade path', href: '/setup/how-to-update-immich', icon: RefreshCw },
];

export default function Home() {
  const docs = getPublishedDocuments();
  return <main id="main-content" className="home-page">
    <section className="home-intro">
      <div className="container home-intro-grid">
        <div className="hero">
          <div className="eyebrow"><span className="status-dot" aria-hidden="true"/>{home.hero.eyebrow}</div>
          <h1>Immich Help<span className="hero-title-detail">Your photos. A clearer path.</span></h1>
          <p>{home.hero.description}</p>
          <div className="hero-search"><SearchDialog documents={docs} hero /><span className="search-key-hint" aria-hidden="true">⌘ K / Ctrl K</span></div>
          <div className="hero-actions"><Link className="primary-button" href="/setup/immich-docker-compose">{home.hero.primaryCta}<ArrowRight size={16} aria-hidden="true"/></Link><Link className="text-link" href="/guides">Explore the guides <ArrowRight size={15} aria-hidden="true"/></Link></div>
        </div>
        <aside className="question-panel" aria-labelledby="common-questions">
          <div className="panel-label">A good place to start</div>
          <h2 id="common-questions">What brought you here?</h2>
          <div className="question-list">{questions.map(({ title, note, href, icon: Icon }) => <Link href={href} key={href}>
            <span className="question-icon"><Icon size={19} aria-hidden="true"/></span><span><strong>{title}</strong><small>{note}</small></span><ArrowRight className="link-arrow" size={16} aria-hidden="true"/>
          </Link>)}</div>
          <p className="panel-footnote">Start with the evidence. Follow the documented next step.</p>
        </aside>
      </div>
    </section>

    <section className="section task-section" aria-labelledby="help-paths">
      <div className="container">
        <div className="section-heading"><div><div className="eyebrow">Find your path</div><h2 id="help-paths">What do you need to do?</h2></div><Link className="text-link" href="/guides">All guides <ArrowRight size={15} aria-hidden="true"/></Link></div>
        <div className="task-grid">{helpPaths.map(path => {
          const Icon = pathIcons[path.icon];
          return <article className="task-card" key={path.id}>
            <Link className="task-card-main" href={path.href}><span className="task-card-top"><span className="task-icon"><Icon size={22} strokeWidth={1.65} aria-hidden="true"/></span><ArrowRight className="link-arrow" size={17} aria-hidden="true"/></span><h3>{path.title}</h3><p>{path.description}</p></Link>
            {path.startHere?.length ? <div className="task-card-links" aria-label={`${path.title} starting points`}>{path.startHere.map(link => <Link href={link.href} key={link.href}>{link.title}<ArrowRight size={13} aria-hidden="true"/></Link>)}</div> : null}
          </article>;
        })}</div>
      </div>
    </section>

    <section className="section popular-section" aria-labelledby="popular-help">
      <div className="container">
        <div className="section-heading"><div><div className="eyebrow">Answers, without the guesswork</div><h2 id="popular-help">Popular help</h2></div><p>Focused guides. Practical checks. Sources you can follow.</p></div>
        <div className="popular-grid">{home.popularHelp.map((card, index) => <Link href={card.href} className="popular-guide" key={card.href}><span className="guide-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span><span className="card-tag">{card.tag}</span><h3>{card.title}</h3><p>{card.description}</p></span><ArrowRight className="link-arrow" size={18} aria-hidden="true"/></Link>)}</div>
      </div>
    </section>

    <section className="section" aria-labelledby="getting-started">
      <div className="container home-resources">
        <div className="resource-panel"><div className="resource-icon"><Download size={20} aria-hidden="true"/></div><h2 id="getting-started">{home.gettingStarted.title}</h2><p>{home.gettingStarted.description}</p><div className="list-card">{home.gettingStarted.items.map(item => <Link href={item.href} key={item.href}>{item.title}<ArrowRight size={16} aria-hidden="true"/></Link>)}</div></div>
        <div className="resource-panel"><div className="resource-icon"><RefreshCw size={20} aria-hidden="true"/></div><h2>From the guide desk</h2><p>Recent checks and updates to the documentation.</p><div className="update-list">{home.latestUpdates.map(item => <Link href={item.href} key={item.title}><time>{item.date}</time><strong>{item.title}</strong><ArrowRight size={16} aria-hidden="true"/></Link>)}</div></div>
      </div>
    </section>
    <section className="section home-bottom"><div className="container help-banner"><div><span className="eyebrow">Keep a recovery path</span><h2>{home.backup.title}</h2><p>{home.backup.description}</p></div><Link className="secondary-button" href={home.backup.href}>Backup &amp; Storage <ArrowRight size={16} aria-hidden="true"/></Link></div></section>
  </main>;
}
