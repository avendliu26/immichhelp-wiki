'use client';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { Search, X } from './icons';
import { Modal } from './modal';
import type { DocumentSummary } from '@/lib/content';

export function SearchDialog({ documents, initialOpen=false, hero=false }: {documents:DocumentSummary[]; initialOpen?:boolean; hero?:boolean}) {
  const [open,setOpen] = useState(initialOpen);
  const [query,setQuery] = useState('');
  const panel = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false),[]);
  const results = documents.filter(doc => [doc.title,doc.description,doc.category,...doc.keywords,...doc.headings].join(' ').toLowerCase().includes(query.trim().toLowerCase())).slice(0,8);
  useEffect(() => {
    if (hero) return; // The header owns the shortcut; the hero is a second opener.
    const shortcut = (event:globalThis.KeyboardEvent) => {
      if ((event.metaKey||event.ctrlKey) && event.key.toLowerCase()==='k') { event.preventDefault(); setOpen(value=>!value); }
    };
    addEventListener('keydown',shortcut);
    return () => removeEventListener('keydown',shortcut);
  },[hero]);
  function navigate(event:KeyboardEvent<HTMLDivElement>) {
    const links = Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>('.search-result') || []);
    const input = panel.current?.querySelector('input');
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (event.key==='ArrowDown' || event.key==='ArrowUp') {
      event.preventDefault();
      const next = event.key==='ArrowDown' ? index+1 : index-1;
      if (next<0) input?.focus(); else links[Math.min(next,links.length-1)]?.focus();
    }
    if (event.key==='Enter' && event.target===input && links.length) { event.preventDefault(); links[0].click(); }
  }
  return <>
    <button className={hero?'hero-search-button':'search-trigger'} onClick={()=>setOpen(true)} aria-label="Open search" aria-haspopup="dialog">
      <Search size={16}/><span>{hero?'Search guides, fixes, and setup notes...':'Search'}</span>{!hero&&<span className="kbd">⌘ K</span>}
    </button>
    <Modal open={open} onClose={close} label="Search help" className="search-overlay">
      <div className="search-panel" ref={panel} onKeyDown={navigate}>
        <div className="search-input-row"><Search size={17}/><input aria-label="Search guides" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search guides, fixes, and setup notes..."/><button className="header-action" onClick={close} aria-label="Close search"><X size={17}/></button></div>
        <div className="search-results">
          {results.length ? results.map(doc=><Link onClick={close} className="search-result" href={`/${doc.slug}`} key={doc.slug}><strong>{doc.title}</strong><small>{doc.category} · {doc.description}</small></Link>) : <div className="empty-state">No guides match “{query}”. Try a different keyword.</div>}
        </div>
        <div className="search-hint" role="status">{results.length ? `${results.length} guides · ↑ ↓ to move · Enter to open · Esc to close` : '0 matching guides'}</div>
      </div>
    </Modal>
  </>;
}
