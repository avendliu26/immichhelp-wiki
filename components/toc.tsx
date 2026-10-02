'use client';
import { useEffect, useRef, useState } from 'react';
import type { TocHeading } from '@/lib/headings';

export function Toc({headings,mobile=false}:{headings:TocHeading[];mobile?:boolean}) {
  const [active,setActive] = useState('');
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const nodes = headings.map(heading=>document.getElementById(heading.id)).filter((node):node is HTMLElement=>!!node);
    let frame = 0;
    const update = () => {
      const visible = nodes.filter(node=>node.getBoundingClientRect().top<=120);
      setActive((visible.at(-1)||nodes[0])?.id||'');
      frame = 0;
    };
    const scroll = () => { if (!frame) frame=requestAnimationFrame(update); };
    update(); addEventListener('scroll',scroll,{passive:true}); addEventListener('resize',scroll);
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll',scroll); removeEventListener('resize',scroll); };
  },[headings]);
  const links = <nav className="toc-links" aria-label="On this page">{headings.map(heading=><a
    className={[heading.level===3?'level-3':'',active===heading.id?'active':''].filter(Boolean).join(' ')}
    aria-current={active===heading.id?'location':undefined} href={`#${heading.id}`} key={heading.id}
    onClick={()=>{if(mobile)details.current?.removeAttribute('open');}}
  >{heading.text}</a>)}</nav>;
  if (mobile) return <details className="toc-mobile" ref={details}><summary>On this page</summary>{links}</details>;
  return <aside className="toc"><div className="toc-title">On this page</div>{links}</aside>;
}
