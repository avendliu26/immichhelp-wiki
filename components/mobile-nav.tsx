'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useState } from 'react';
import { Menu, X } from './icons';
import { Modal } from './modal';
import { navigation } from '@/src/config/navigation';

export function MobileNav() {
  const [open,setOpen] = useState(false);
  const id = useId();
  const pathname = usePathname();
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => { close(); }, [pathname, close]);
  useEffect(() => {
    const desktop = matchMedia('(min-width: 981px)');
    const resize = () => { if (desktop.matches) close(); };
    desktop.addEventListener('change',resize);
    return () => desktop.removeEventListener('change',resize);
  }, [close]);
  return <>
    <button className="header-action mobile-only" onClick={() => setOpen(true)}
      aria-label="Toggle navigation" aria-expanded={open} aria-controls={id} aria-haspopup="dialog">
      <Menu size={19}/>
    </button>
    <Modal open={open} onClose={close} id={id} label="Navigation menu" className="mobile-nav-overlay">
      <div className="mobile-nav-panel">
        <div className="mobile-nav-head"><strong>Navigation</strong><button className="header-action" onClick={close} aria-label="Close navigation"><X size={19}/></button></div>
        <nav aria-label="Mobile navigation">{navigation.map(group => <div className="sidebar-group" key={group.title}>
          <div className="sidebar-title">{group.title}</div>
          {group.items.map(item => <Link onClick={close} className={`sidebar-link${pathname===item.href?' active':''}`} aria-current={pathname===item.href?'page':undefined} href={item.href} key={item.href}>{item.title}</Link>)}
        </div>)}</nav>
      </div>
    </Modal>
  </>;
}
